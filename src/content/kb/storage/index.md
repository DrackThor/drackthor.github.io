---
title: "Linux Storage Foundations: VFS, Inodes, Dentries, Mounts, and Filesystems"
category: "Storage"
tags:
  - "storage"
  - "linux"
  - "vfs"
  - "filesystem"
draft: true
sourcePath: "docs/storage/index.md"
---

Linux storage is easier to reason about if you separate concerns: namespace and metadata handling at the VFS layer, filesystem-specific behavior in drivers, and persistence in underlying devices. This section builds that model step by step and prepares you for advanced topics such as tuning, troubleshooting, and storage design choices [1], [2].

## What is it?

This storage section is a structured learning path for the Linux file stack. It covers the Virtual File System (VFS), inode and dentry behavior, mount mechanics, and common filesystem families used in production [1], [2], [3], [4].

The goal is not to memorize individual commands, but to understand how path-based operations map to kernel objects and where decisions are enforced:

- Name resolution and caching (`dentry`)
- Metadata identity (`inode`)
- Namespace composition (`mount`)
- On-disk or network-backed semantics (filesystem implementation)

## Why do we need it? Where do we use it?

These concepts are required in almost every Linux role: platform engineering, SRE, security engineering, and systems development. If you cannot explain how an `open(2)` call crosses mountpoints and resolves inodes, you will struggle with permission bugs, performance bottlenecks, and operational incident analysis [1], [5].

Typical usage contexts:

- Operating system and kernel courses
- Production Linux platform operations
- Container and Kubernetes runtime troubleshooting
- Filesystem and storage architecture decisions

## History Lesson

| When  | What                                                                                      |
| ----- | ----------------------------------------------------------------------------------------- |
| 1970s | UNIX establishes the inode-based file model that modern Unix-like systems still use [6].  |
| 1991  | Linux begins as a Unix-like kernel and adopts a VFS-centered filesystem architecture [1]. |
| 2001  | XFS support matures in Linux for high-scale workloads [7].                                |
| 2008  | ext4 enters mainstream Linux usage as the successor to ext3 [8].                          |
| 2009  | Btrfs reaches mainline Linux and introduces CoW snapshots and checksumming [9].           |
| 2016  | NFSv4.2 extends network filesystem capabilities in the IETF standard track [10].          |

## Interaction with other topics?

Storage concepts interact with multiple sections in this repository:

- [Virtualization](/kb/virtualization): virtual disks and host filesystem behavior directly affect guest performance and consistency.
- [Container](/kb/container): container writable layers and volume mounts depend on VFS and mount namespace behavior.
- [Infrastructure as Code](/kb/iac/terraform): storage provisioning decisions (block/file/object) should be versioned and reproducible.

## How does it work?

At runtime, Linux storage operations follow a layered architecture:

```d2
direction: right

classes: {
  layer: {
    style: {
      fill: "#E8FCE8"
      stroke: "#2F7A32"
      border-radius: 8
    }
  }
  edge: {
    style: {
      animated: true
      stroke: "#1E3A8A"
    }
  }
}

user: User Process {shape: person}
syscalls: Syscalls (open/read/write/stat) {class: layer}
vfs: Linux VFS {class: layer}
fs: Filesystem Driver (ext4, XFS, Btrfs, NFS) {class: layer}
cache: Page Cache + Dentry/Inode Caches {class: layer}
block: Block Layer / Network Client {class: layer}
device: Device or Remote Server {class: layer}

user -> syscalls: path + flags
syscalls -> vfs: VFS API
vfs -> cache: metadata/data cache checks
vfs -> fs: dispatch operation
fs -> block: I/O request
block -> device: persistence
```

The learning path in this section follows that model from abstraction to concrete examples:

1. [Linux VFS](/kb/storage/vfs)
2. [Inodes](/kb/storage/inodes)
3. [Dentries](/kb/storage/dentry)
4. [Mounting](/kb/storage/mounting)
5. [Filesystem examples](/kb/storage/filesystems)

## Examples: Usage or Theory

### Example 1: Quick system inventory of storage layers

Prerequisites: Linux host with `findmnt` and `lsblk`.

```bash
$ set -euo pipefail
$ uname -r
$ cat /proc/filesystems
$ findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
$ lsblk -f
```

This command group gives you a high-level map of the VFS-visible filesystem types, active mounts, and underlying block topology.

### Example 2: Verify where a specific path resolves

```bash
$ set -euo pipefail
$ TARGET_PATH="/etc/passwd"
$ findmnt -T "${TARGET_PATH}" -o TARGET,SOURCE,FSTYPE,OPTIONS
$ stat "${TARGET_PATH}"
```

Use this pattern whenever a path behaves unexpectedly. It immediately shows which mount and filesystem actually back that path.

## References and further reading

[1] Linux Kernel Documentation, "Virtual Filesystem." Accessed: Feb. 21, 2026. [Online]. Available: https://docs.kernel.org/filesystems/vfs.html

[2] Linux Kernel Documentation, "Dentry Cache (dcache)." Accessed: Feb. 21, 2026. [Online]. Available: https://www.kernel.org/doc/html/latest/filesystems/dcache.html

[3] M. Kerrisk, "path_resolution(7)." Accessed: Feb. 21, 2026. [Online]. Available: https://man7.org/linux/man-pages/man7/path_resolution.7.html

[4] M. Kerrisk, "mount(8)." Accessed: Feb. 21, 2026. [Online]. Available: https://man7.org/linux/man-pages/man8/mount.8.html

[5] M. Kerrisk, "open(2)." Accessed: Feb. 21, 2026. [Online]. Available: https://man7.org/linux/man-pages/man2/open.2.html

[6] M. Kerrisk, "inode(7)." Accessed: Feb. 21, 2026. [Online]. Available: https://www.man7.org/linux/man-pages/man7/inode.7.html

[7] Linux Kernel Documentation, "XFS Filesystem." Accessed: Feb. 21, 2026. [Online]. Available: https://docs.kernel.org/admin-guide/xfs.html

[8] Linux Kernel Documentation, "ext4 Filesystem." Accessed: Feb. 21, 2026. [Online]. Available: https://docs.kernel.org/6.16/admin-guide/ext4.html

[9] Linux Kernel Documentation, "Btrfs." Accessed: Feb. 21, 2026. [Online]. Available: https://docs.kernel.org/6.1/filesystems/btrfs.html

[10] C. Lever et al., "Network File System (NFS) Version 4 Minor Version 2 Protocol," RFC 7862, Nov. 2016. [Online]. Available: https://www.rfc-editor.org/rfc/rfc7862
