---
title: "LDAP"
category: "Security & IAM"
tags:
  - "iam"
  - "authentication"
  - "ldap"
  - "directory"
draft: true
sourcePath: "docs/iam/authentication/ldap.md"
---

LDAP (Lightweight Directory Access Protocol) is a standard protocol for querying and managing directory services. In IAM environments, LDAP is commonly used as a source for users, groups, and attributes, and in some setups it also participates directly in authentication workflows [1], [2].

## What is it?

LDAP provides operations over a hierarchical directory model called the Directory Information Tree (DIT) [1]. Entries follow schema definitions, and authentication is performed through bind operations with security controls such as StartTLS or SASL [2].

Relevant LDAP concepts:

- `DN` (Distinguished Name): unique entry path in the DIT
- `Bind`: operation used to authenticate a client
- `Search`: operation used to query users and groups
- `Schema`: structural and attribute constraints for entries

## Why do we need it? Where do we use it?

LDAP is useful when multiple systems need a shared, queryable identity directory with predictable schema and mature operational tooling.

Typical usage patterns:

- Central corporate user and group directory
- Backing directory for IdP platforms
- Legacy platform integration
- Internal authentication for network and platform services

## History Lesson

| When | What                                                                       |
| ---- | -------------------------------------------------------------------------- |
| 2006 | LDAPv3 protocol is standardized in RFC 4511 [1].                           |
| 2006 | LDAP authentication and security guidance is standardized in RFC 4513 [2]. |
| 2015 | SCIM 2.0 gains broad adoption as provisioning complement to LDAP [3], [4]. |

## Interaction with other topics?

- **Identities and IdP**: LDAP is often an identity source, while IdPs handle federation (`../identities-idp.md`).
- **SAML/OIDC**: identity claims in assertions/tokens are frequently mapped from LDAP attributes.
- **Authorization**: LDAP group memberships are common RBAC inputs.

## How does it work?

LDAP workflow in IAM operations:

1. Client opens connection to LDAP server.
2. TLS protection is enabled.
3. Client performs bind operation.
4. Client searches for users/groups.
5. Results feed authentication, profile mapping, or authorization logic.

```mermaid
flowchart LR
  APP[Application] --> CONN[LDAP connection]
  CONN --> TLS[TLS or StartTLS]
  TLS --> BIND[Bind operation]
  BIND --> SEARCH[Search users and groups]
  SEARCH --> ATTR[Resolve attributes]
  ATTR --> AUTHZ[Policy input]

  classDef actor fill:#E0F2FE,stroke:#075985,color:#0C4A6E;
  classDef protocol fill:#DCFCE7,stroke:#166534,color:#14532D;
  classDef decision fill:#FEE2E2,stroke:#991B1B,color:#7F1D1D;

  class APP actor;
  class CONN,TLS,BIND,SEARCH,ATTR protocol;
  class AUTHZ decision;
```

## Examples: Usage or Theory

### Example 1: Query a user with `ldapsearch`

Prerequisites: LDAP host, bind DN, and bind secret.

```bash
$ set -euo pipefail
$ export LDAP_URI="ldaps://ldap.example.com:636"
$ export LDAP_BIND_DN="uid=svc-reader,ou=service,dc=example,dc=com"
$ export LDAP_BIND_PW="<LDAP_BIND_PASSWORD>"
$ ldapsearch \
  -H "${LDAP_URI}" \
  -D "${LDAP_BIND_DN}" \
  -w "${LDAP_BIND_PW}" \
  -b "dc=example,dc=com" \
  "(uid=max.mustermann)" \
  cn mail memberOf
```

Canonical output shape:

```text
dn: uid=max.mustermann,ou=people,dc=example,dc=com
cn: Max Mustermann
mail: max.mustermann@example.com
memberOf: cn=platform-team,ou=groups,dc=example,dc=com
```

### Example 2: Typical DIT layout

```text
dc=example,dc=com
|- ou=people
|  |- uid=max.mustermann
|- ou=groups
   |- cn=platform-team
   |- cn=project-x-engineers
```

## References and further reading

[1] K. Zeilenga, "Lightweight Directory Access Protocol (LDAP): The Protocol," RFC 4511, Jun. 2006. [Online]. Available: https://www.rfc-editor.org/rfc/rfc4511

[2] J. Hodges, R. Morgan, and M. Wahl, "LDAP: Authentication Methods and Security Mechanisms," RFC 4513, Jun. 2006. [Online]. Available: https://www.rfc-editor.org/rfc/rfc4513

[3] P. Hunt et al., "System for Cross-domain Identity Management: Core Schema," RFC 7643, Sep. 2015. [Online]. Available: https://www.rfc-editor.org/rfc/rfc7643

[4] P. Hunt et al., "System for Cross-domain Identity Management: Protocol," RFC 7644, Sep. 2015. [Online]. Available: https://www.rfc-editor.org/rfc/rfc7644
