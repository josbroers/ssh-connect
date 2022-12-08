# SSH Connect

![npm](https://img.shields.io/npm/v/@josbroers/ssh-connect)

A package to easily connect and manage your SSH connections.

Note: the arguments are optional

## Table of contents

- [1. Node.js](#1-nodejs)
- [2. Configure](#2-configure)
- [3. Scripts](#3-scripts)
	- [3.2 Aliases](#32-aliases)

## 1. Node.js

First install the Node.js higher or equal to 16. Use the JavaScript Tool Manager [Volta](https://volta.sh/) or
the [Node Version Manager](https://github.com/nvm-sh/nvm).

## 2. Configure

Before you can use this package as an executable you need to create a JSON file. Run the following command to create
this file:

```bash
ssh-connect configure <path_for_file>
```

## 3. Scripts

#### To create a connections file, use:

```bash
ssh-connect configure <path_for_file>
```

#### To list all the defined connections, use:

```bash
ssh-connect list <path_for_file>
```

#### To connect to a listed connection, use:

```bash
ssh-connect connect <path_to_file> <connection_name>
```

#### To add a new connection, use:

```bash
ssh-connect add <path_to_file> <connection_name>
```

#### To remove a listed connection, use:

```bash
ssh-connect remove <path_to_file> <connection_name>
```

#### To edit a listed connection, use:

```bash
ssh-connect edit <path_to_file> <connection_name>
```

#### To get the IP-address of a listed connection, use:

```bash
ssh-connect get <path_to_file> <connection_name>
```

### 3.2 Aliases

You can use aliases to predefine the type, connection:

```bash
alias ssh-con="ssh-connect connect $HOME/connections.json"
alias ssh-add="ssh-connect add $HOME/connections.json"
alias ssh-rm="ssh-connect remove $HOME/connections.json"
alias ssh-ls="ssh-connect list $HOME/connections.json"
alias ssh-edit="ssh-connect edit $HOME/connections.json"
alias ssh-get="ssh-connect get $HOME/connections.json"
```

You can take it even further by making aliases for specific connection names:

```bash
alias google="ssh-connect connect $HOME/connections.json google"
alias ssh-google="ssh-connect connect $HOME/connections.json google"

alias cloudflare="ssh-connect connect $HOME/connections.json cloudflare"
alias ssh-cloudflare="ssh-connect connect $HOME/connections.json cloudflare"
```
