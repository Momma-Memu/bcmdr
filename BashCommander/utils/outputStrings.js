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

- Add all existing aliases
    bcmdr --add | -a | add | a

- Edit all existing aliases
    bcmdr --edit | -e | edit | e

- Remove an existing alias
    bcmdr --remove | -r | remove | r
`);

export const configStr = (config, bcmdrPath) => console.log(`
Username: ${config.username}
Bash File Path: ${config.path}
Config File Path: ${config.path.split("/").slice(0, 3).join("/")}${bcmdrPath}
`);

export const tutorialStr = () => console.log(`
~ How To Guides ~
- CLI Syntax
  The first argument to bcmdr should match either a menu option as stated in the
  help guide (try "bcmdr help"), or the name of a user created alias.
  Arguments can be formatted with two hyphens "--" one, or none.

- Add/Edit/Remove Alias
  Aliases can be created by supplying a name, command, sub arguments 
  (which can be other aliases), a flag for enabling output logs, 
  and a flag for running the command detached.

  Only the "name" and "command" arguments are required to create a new alias, 
  by default, bcmdr will supply the neccesarry fallback values.

  note:
  You will not see any logs when running commands when detached is true even 
  if you set showLogs to true.

  Examples:
  bcmdr --add --open dolphin pwd false true
  bcmdr -a -open dolphin pwd false true
  bcmdr a dolphin dolphin pwd false true

- EDIT Alias:
  Examples:
  bcmdr --edit --open dolphin pwd false true
  bcmdr -e -open dolphin pwd false true
  bcmdr e open dolphin pwd false true

- REMOVE Alias:
  Examples:
  bcmdr --remove --open
  bcmdr -r -open
  bcmdr r open
`);
