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

export const configStr = (fileName, bcmdrPath) => console.log(`
Bash File Name: ${fileName}
Config File Path: ${bcmdrPath}
`);

export const tutorialStr = () => console.log(`
- CLI Syntax:
  The first argument to bcmdr should match either a menu option from the
  help guide (try "bcmdr help"), or the name of a user created alias.
  Bcmdr's syntax uses empty spaces, and commas.

- Example: "bcmdr remove open"
  The above is seperated into two distinct parts. The action bcmdr should 
  perform, "remove", and the arguments "open" which in this case is the name
  of the alias the user wants to remove.

- Arguments to Add/Edit/Remove are as follows:
  name -> The alias name
  cmd -> The command recognized by the system
  parg -> Plain text args given to cmd
  darg -> Dependent args/another alias, output given to cmd
  detach -> Boolean (true/false), executes cmd outside terminal
  logs -> Boolean, display output to the console

- Note:
  Logs will not be shown when running commands as detached. This is true even 
  when using "logs=true." You may see some logs, if they are part of a nested
  command that executes before a parent that runs detached.

- ADD Alias:
  $ bcmdr add name=pwd, cmd=pwd, detach=false, logs=true
    # When optional arguments are ommitted, defaults are used.

  $ bcmdr add name=open,cmd=dolphin,darg=pwd,detach=false,logs=false
    # Spaces are optional and trimmed, commas are required.

  $ bcmdr a name=open,cmd=dolphin,darg=pwd,detach=true,logs=true
    # You may mix and match single and double dash syntax.

  $ bcmdr a name=dolphin,cmd=dolphin,parg=,darg=pwd,detach=true,logs=false
    # Empty arguments are also permitted.

- EDIT Alias:
  $ bcmdr edit alias=dolphin,name=open
    # The "alias" arg specifies which to edit. Pass only what you need changed.

  $ bcmdr e alias=open,name=dolphin
    # The "alias" arg specifies which to edit. Pass only what you need changed.

  $ bcmdr e alias=open,name=dolphin,parg=,darg=pwd
    # Empty args are valid here also, replacing original with empty/null instead.

- REMOVE Alias:
  $ bcmdr remove alias=open
    # Remove needs only two arguments, the flag "r"/"remove", and the name of the alias.

  $ bcmdr r open
    # Unlike Add/Edit, named arguments is not needed.
`);
