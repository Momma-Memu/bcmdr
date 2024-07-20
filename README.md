```
          _____                _____                _____                _____                _____          
         /\    \              /\    \              /\    \              /\    \              /\    \         
        /::\    \            /::\    \            /::\____\            /::\    \            /::\    \        
       /::::\    \          /::::\    \          /::::|   |           /::::\    \          /::::\    \       
      /::::::\    \        /::::::\    \        /:::::|   |          /::::::\    \        /::::::\    \      
     /:::/\:::\    \      /:::/\:::\    \      /::::::|   |         /:::/\:::\    \      /:::/\:::\    \     
    /:::/__\:::\    \    /:::/  \:::\    \    /:::/|::|   |        /:::/  \:::\    \    /:::/__\:::\    \    
   /::::\   \:::\    \  /:::/    \:::\    \  /:::/ |::|   |       /:::/    \:::\    \  /::::\   \:::\    \   
  /::::::\   \:::\    \/:::/    / \:::\    \/:::/  |::|___|______/:::/    / \:::\    \/::::::\   \:::\    \  
 /:::/\:::\   \:::\ ___\::/    /   \:::\    \::/   |::::::::\    \::/    /   \:::\ ___\::/\:::\   \:::\____\ 
/:::/__\:::\   \:::|    |/____/     \:::\____\/    |:::::::::\____\/____/     \:::|    |/  \:::\   \:::|    |
\:::\   \:::\  /:::|____|\    \      \::/    /    / ~~~~~/:::/    /\    \     /:::|____|   |::::\  /:::|____|
 \:::\   \:::\/:::/    /::\    \      \/____/____/      /:::/    /::\    \   /:::/    /___/|:::::\/:::/    / 
  \:::\   \::::::/    /\:::\    \                      /:::/    /\:::\    \ /:::/    /     |:::::::::/    /  
   \:::\   \::::/    /  \:::\    \                    /:::/    /  \:::\    /:::/    /      |::|\::::/    /   
    \:::\  /:::/    /    \:::\    \                  /:::/    /    \:::\  /:::/    /       |::| \::/____/    
     \:::\/:::/    /      \:::\    \                /:::/    /      \:::\/:::/    /        |::|  ~|          
      \::::::/    /        \:::\    \              /:::/    /        \::::::/    /         |::|   |          
       \::::/    /          \:::\____\            /:::/    /          \::::/    /          \::|   |          
        \::/____/            \::/    /            \::/    /            \::/____/            \:|   |          
         ~~                   \/____/              \/____/              ~~                   \|___|          
```

# BashCommander

BashCommander, or "bcmdr", is a CLI tool that assists in creating complex, interdependent aliases easily and quickly. BCmdr makes
managing your aliases easy as well, offering ways to edit, remove, and list any aliases created with it.

BCmdr will update your bash_profile, or bashrc file on your behalf, WITHOUT overwriting any existing content within that file
by tracking where the aliases created with it begin, and end. 

# Setup - Installation
- TBD

# Remove - Uninstall
- TBD

# How BashCommander Works
BashCommander is, in essence, a NodeJS script using [node:child_process](https://nodejs.org/api/child_process.html#child-process) 
to handle the execution of commands. Nested commands are executed and awaited first with [Async/Await](https://nodejs.org/api/async_context.html#usage-with-asyncawait) 
syntax, halting the parent process as they must first wait for the output of that child process to be used as an argument. 

Finally, BCmdr will interface with your bash file to read, append, remove, and update ONLY aliases created using the tool. 
BCmdr will NOT overwrite any existing content within your designated bash file. It does this by marking it's own begin and end.
When no boundary has been set, it will not allow any further interfacing until you either manually resolve them, or run the internal 
setup command again.

In the event BCmdr is unable to determine where it's aliases begin and end within the designated bash file, 
BCmdr will reference an internal backup of your latest command entries and create a draft of your restored bash file.
The draft is then shown to you, and requires your approval/rejection to restore the entire file.

# Nesting/Chaining BashCommands
One notable feature of BCmdr is the ability to pass BashCommands as arguments to other BashCommand.
You may hypothetically create a BashCommand, "A", that uses the output of "B" as an argument, or have 
command "B" execute other commands with some recursive branching.

This feature has limitations for reasons that should be obvious, for example, a set of commands that
result in a circular dependency loop until a stack overflow occurs. BCmdr will throw an error whenever
you try to create, add, edit any commands that would cause this behavior.

# Quick Guide - Options Menu

Note: All commands (aside from those you create and add to your bash_profile / bashrc file) are prefixed
with "bcmdr" and has been ommitted from the table for brevity. Below each table are examples of their use.

### Help/Guide/Options
| Option   | Variations | Description         |
|:---------|:-----------|:--------------------|
| help     | help, h    | Display Help        |
| config   | config, c  | Display Config      |
| path     | path, p    | Set Alias save file |
| guide    | guide, g   | Display Tutorial    |
| list     | list, l    | List Aliases        |

```
$ bcmdr help
$ bcmdr config
$ bcmdr path
$ bcmdr guide
$ bcmdr list
$ bcmdr h
$ bcmdr c
$ bcmdr p
$ bcmdr g
$ bcmdr l
```

### Alias Operations
| Option | Variations | Args  | Description       |
|:-------|:-----------|:------|:------------------|
| add    | add, a     | 6     | Add a New Alias   |
| edit   | edit, e    | 7     | Edit an Alias     |
| remove | remove, r  | 1     | Remove an Alias   |

### ADD Alias Arguments
| Name     | Optional | Default   | Description          |
|:---------|:---------|:----------|:---------------------|
| name     | No       | N/A       | Alias name           |
| command  | No       | N/A       | System command name  |
| pargs    | Yes      | []        | Plain text args      |
| dargs    | Yes      | []        | Dependent commands   |
| detached | Yes      | false     | Detach from terminal |
| logs     | Yes      | true      | Log command output   |

```
$ bcmdr add name=open,cmd=dolphin,darg=pwd,detach=false,logs=false
```

### EDIT Alias Arguments
| Name     | Optional | Default   | Description          |
|:---------|:---------|:----------|:---------------------|
| alias    | No       | N/A       | Current Alias name   |
| name     | Yes      | Unchanged | New Alias name       |
| command  | Yes      | Unchanged | System command name  |
| pargs    | Yes      | Unchanged | Plain text args      |
| dargs    | Yes      | Unchanged | Dependent commands   |
| detached | Yes      | Unchanged | Detach from terminal |
| logs     | Yes      | Unchanged | Log command output   |

```
$ bcmdr edit alias=dolphin,name=open 
$ bcmdr e alias=open,name=dolphin 
```

### REMOVE Alias Arguments
| Name     | Optional | Description    |
|:---------|:---------|:---------------|
| alias    | No       | Name of Alias  |

```
$ bcmdr remove alias=dolphin 
$ bcmdr r alias=open
```
