# SSH Connect

![npm](https://img.shields.io/npm/v/@josbroers/ssh-connect)

A package to easily connect and manage your SSH connections.

## Table of contents

- [1. Node.js](#1-nodejs)
- [2. Configure](#2-configure)
- [3. Scripts](#3-scripts)

## 1. Node.js

First install the Node.js higher or equal to 14. Use the JavaScript Tool Manager [Volta](https://volta.sh/) or
the [Node Version Manager](https://github.com/nvm-sh/nvm).

## 2. Configure

Before you can use this package as an executable you need to create a JSON file. Run the following command to create this file:

```bash
ssh-connect configure <path_for_file>
```

## 3. Scripts

- Use `ssh-connect configure <path_for_file>` to create a connections file
- Use `ssh-connect connect <path_to_file>` to connect to a listed connection
- Use `ssh-connect list <path_for_file>` list all the connections
- Use `ssh-connect add <path_to_file>` to add a new connection
- Use `ssh-connect remove <path_to_file>` to remove a listed connection
- Use `ssh-connect edit <path_for_file>` edit one of the connections
