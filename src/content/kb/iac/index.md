---
title: "Infrastructure as Code"
category: "Infrastructure"
draft: true
sourcePath: "docs/iac/index.md"
---

## Infrastructure as Code (IaC)

When managing (cloud) infrastructure, you can either click around in the provider’s UI or define everything in code.
The second approach is called **Infrastructure as Code (IaC)**, and it’s becoming the standard for teams that care about **consistency, automation, and scalability**.

So what’s wrong with clicking?

- It’s **manual** — you can forget steps.
- It’s **not reproducible** — nobody knows exactly what you did.
- It’s **hard to track** — no version control.
- It’s **slow** — repetitive tasks take time.

Instead, defining infrastructure with code solves these problems:

| Concept             | Description                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **Idempotency**     | Running the same IaC file multiple times leads to the same result — no duplicates or inconsistencies. |
| **Versioning**      | Since it’s code, you can store it in Git and track changes.                                           |
| **Distribution**    | Easily share configurations with teammates or reuse them across environments.                         |
| **Desired State**   | You describe _what_ you want, not _how_ to get there — the tool handles it.                           |
| **Reproducibility** | Build the same environment anywhere, anytime.                                                         |
| **Time Saving**     | Automate resource creation and updates.                                                               |
| **CRUD**            | Create, Read, Update, Delete — all through code.                                                      |

> **Tip:** Think of IaC like a recipe. Instead of manually cooking every dish differently each time, you just follow a consistent recipe and get the same result every time.

## History Lesson

| Year      | Event          | Description                                                      |
| --------- | -------------- | ---------------------------------------------------------------- |
| **2006**  | AWS EC2 Launch | Cloud computing begins to replace on-prem infrastructure.        |
| **2011**  | Chef & Puppet  | Configuration management tools gain traction.                    |
| **2014**  | Terraform 0.1  | HashiCorp introduces a declarative IaC tool for multi-cloud use. |
| **2016**  | CloudFormation | AWS expands their IaC capabilities natively.                     |
| **2020+** | GitOps, Pulumi | Modern IaC integrates with DevOps and programming languages.     |

## Interaction with other topics?

_BEWARE_ IaC is only concerned with infrastructure (network, storage, load-balancers,..) and creating VMs, but not with the application itself.

- Creating infrastructure and VMs - IaC.
- Configuring VMs - [Configuration Management / Configuration as Code](/kb/config).
- Building applications - [Continuous Integration](/kb/cicd/ci).
- Deploying applications - [Continuous Deployment](/kb/cicd/cd).

The IaC and Config as Code parts are usually kept in different repositories than the application code.
Depending on the technologies used, also IaC and Config as Code are managed in different repositories and by different teams.
It is also very common to have a ratio of `n` applications running on the infrastructure of `1` IaC / Config repository.

Example:

- Terraform manages the infrastructure of a k8s cluster (network, loadbalancer, VMs, security groups,..)
- Cloud-Init manages the initial configuration of the VMs (disk layout, network, users,..)
- Ansible manages the day 2 configuration of the k8s VMs (update packages, install k8s, configure certificates,..)
- 5 Java applications are built (maven) and containerized (docker) in their CI pipelines
- 3 Python applications are built (uv) and containerized (docker) in their CI pipelines
- one repo holds the deployment config for all applications (helm) and deploys them to the k8s cluster

## How does it work?

IaC uses **declarative** or **imperative** approaches:

| Approach        | Description                                                        | Example                   |
| --------------- | ------------------------------------------------------------------ | ------------------------- |
| **Declarative** | Define _what_ the end state should be. The tool figures out _how_. | Terraform, CloudFormation |
| **Imperative**  | Define _how_ to reach the end state step by step.                  | Ansible, scripts          |

Example (Terraform):

```hcl
resource "aws_instance" "web" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}
```

Run the following commands:

```bash
terraform init # <- only needed once; prepare the working directory for Terraform
terraform plan # <- show what Terraform will do
terraform apply # <- apply the changes
# use the resource
terraform destroy # <- destroy the resources
```

## Example: Exoscale VM without IaC

This is a quick example on how to create a VM on Exoscale.
It demonstrates the multiple steps required to create a VM - while the GUI provides a nice interface for this, it's still a manual process.

- access [https://portal.exoscale.com/](https://portal.exoscale.com/)
- "Compute" -> "Instances" -> "ADD"
- provide a name
- select the `template`: "Linux Ubuntu 22.04 LTS 64-bit"
- select `zone`: "AT-VIE-1"
- select `instance type`: "Standard - Small"
- select `disk size`: "50GB"
- "ADD"

- "Compute" -> "Security Groups" -> "ADD"
- `name`: "public"
- "ADD"
- "Compute" -> "Security Groups" -> "public"
- "ADD RULE" -> "SSH"
- "Instances" (Tab) -> "ATTACH" -> "<my-machine>"

To improve the example further, one should also use `cloud-init user data` to configure the VM and provide a SSH key.

## Example: Exoscale VM with Terraform

This example demonstrates how to create a VM on Exoscale using Terraform.
The result for one VM will be the same as the manual process above.
BUT this will be faster, easier and more reproducible.

- first we need to create a proper role once
  - "IAM" -> "ROLES" -> "ADD"
  - `name`: demo
  - "ADD SERVICE CLASS": `compute`
  - "CREATE"
- then we need to create an API key pair once
  - "IAM" -> "KEYS" -> "ADD"
  - `name`: demo
  - `Role`: demo

- create a new folder on your local machine
- create the follwing files in that folder

```hcl
# terraform.tf
terraform {
  required_providers {
    exoscale = {
      source = "exoscale/exoscale"
    }
  }
}

provider "exoscale" {
  key    = "EXO9a94805185b8e58bd27d0227"
  secret = "lAkUIGH_LbGNCuOYbe2Rl840CV9xUGXOlDp2dJngJTU"
}
```

```hcl
# sg.tf
resource "exoscale_security_group" "sg_ssh_only" {
  name = "ssh-only"
}

resource "exoscale_security_group_rule" "sg_rule_ssh_ingress" {
  security_group_id = exoscale_security_group.sg_ssh_only.id
  type              = "INGRESS"
  protocol          = "TCP"
  cidr = "0.0.0.0/0" # "::/0" for IPv6
  description       = "Allow SSH access from anywhere"
  start_port        = 22
  end_port          = 22
}
```

```hcl
# vm.tf
data "exoscale_template" "linux_22_vie" {
  zone = "at-vie-1"
  name = "Linux Ubuntu 22.04 LTS 64-bit"
}

resource "exoscale_compute_instance" "vm" {
  zone = "at-vie-1"
  name = "demo-2"

  template_id        = data.exoscale_template.linux_22_vie.id
  type               = "standard.small"
  disk_size          = 50
  security_group_ids = [exoscale_security_group.sg_ssh_only.id]
}
```

```shell
terraform init # <- only needed once; prepare the working directory for Terraform
terraform plan # <- show what Terraform will do
terraform apply # <- apply the changes
# use the resource
terraform destroy # <- destroy the resources
```

## References and Further Reading

- [Terraform Docs](https://developer.hashicorp.com/terraform/docs)
- [Pulumi](https://www.pulumi.com/)
