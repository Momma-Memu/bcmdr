export const helpStr = () => console.log(`
~ Bash Commander Help Menu ~

- Help Menu
    bcmdr --help | -h | help | h

- Show Config Information
    bcmdr --config | -c | config | c

- Show Alias Tutorial 
    bcmdr --tutorial | -t | tutorial | t

- List all existing aliases
    bcmdr --list | -l | list | l
`);

export const configStr = (config, bcmdrPath) => console.log(`
Username: ${config.username}
Bash File Path: ${config.path}
Config File Path: ${config.path.split("/").slice(0, 3).join("/")}${bcmdrPath}
`);

export const tutorialStr = () => console.log(`
~ How To Guides ~

- ADD Alias
  Aliases can be created by supplying a name, command, 
  default arguments (Which can be other aliases!), a flag 
  for enabling output logs, and a flag for running the command detached.

  Only the "name" and "command" arguments are required to create a new alias, 
  by default, no default arguments/flags are supplied to your alias, 
  logs are enabled by default, and detached mode is not enforced by default.

  note:
  You CANNOT run a command where logs are enabled, and detached is forced.
  This wouldn't break anything, however, logs cannot be shown to you
  if you use detached mode.

  Examples:
  bcmdr --add name=dolphin command=dolphin defaults=pwd logs=false detached=true
  bcmdr -a name=dolphin command=dolphin defaults=pwd logs=false detached=true
  bcmdr -a dolphin dolphin pwd false true

- EDIT Alias:
  Examples:
  bcmdr --edit name=open command=dolphin defaults=pwd logs=false detached=true
  bcmdr -e name=open command=dolphin defaults=pwd logs=false detached=true
  bcmdr -e open dolphin pwd false true

- REMOVE Alias:
  Examples:
  bcmdr --remove open
  bcmdr -r open
`);
