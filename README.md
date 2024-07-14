```
          _____                   _____                   _____                   _____                   _____          
         /\    \                 /\    \                 /\    \                 /\    \                 /\    \         
        /::\    \               /::\    \               /::\____\               /::\    \               /::\    \        
       /::::\    \             /::::\    \             /::::|   |              /::::\    \             /::::\    \       
      /::::::\    \           /::::::\    \           /:::::|   |             /::::::\    \           /::::::\    \      
     /:::/\:::\    \         /:::/\:::\    \         /::::::|   |            /:::/\:::\    \         /:::/\:::\    \     
    /:::/__\:::\    \       /:::/  \:::\    \       /:::/|::|   |           /:::/  \:::\    \       /:::/__\:::\    \    
   /::::\   \:::\    \     /:::/    \:::\    \     /:::/ |::|   |          /:::/    \:::\    \     /::::\   \:::\    \   
  /::::::\   \:::\    \   /:::/    / \:::\    \   /:::/  |::|___|______   /:::/    / \:::\    \   /::::::\   \:::\    \  
 /:::/\:::\   \:::\ ___\ /:::/    /   \:::\    \ /:::/   |::::::::\    \ /:::/    /   \:::\ ___\ /:::/\:::\   \:::\____\ 
/:::/__\:::\   \:::|    /:::/____/     \:::\____/:::/    |:::::::::\____/:::/____/     \:::|    /:::/  \:::\   \:::|    |
\:::\   \:::\  /:::|____\:::\    \      \::/    \::/    / ~~~~~/:::/    \:::\    \     /:::|____\::/   |::::\  /:::|____|
 \:::\   \:::\/:::/    / \:::\    \      \/____/ \/____/      /:::/    / \:::\    \   /:::/    / \/____|:::::\/:::/    / 
  \:::\   \::::::/    /   \:::\    \                         /:::/    /   \:::\    \ /:::/    /        |:::::::::/    /  
   \:::\   \::::/    /     \:::\    \                       /:::/    /     \:::\    /:::/    /         |::|\::::/    /   
    \:::\  /:::/    /       \:::\    \                     /:::/    /       \:::\  /:::/    /          |::| \::/____/    
     \:::\/:::/    /         \:::\    \                   /:::/    /         \:::\/:::/    /           |::|  ~|          
      \::::::/    /           \:::\    \                 /:::/    /           \::::::/    /            |::|   |          
       \::::/    /             \:::\____\               /:::/    /             \::::/    /             \::|   |          
        \::/____/               \::/    /               \::/    /               \::/____/               \:|   |          
         ~~                      \/____/                 \/____/                 ~~                      \|___|          
```

# BashCommander

BashCommander, or "bcmdr", is a CLI tool that assists in creating complex, interdependent aliases easily and quickly. BCmdr makes
managing your aliases easy as well, offering ways to edit, remove, and list any aliases created with it.

BCmdr will update your bash_profile, or bashrc file on your behalf, WITHOUT overwriting any existing content within that file
by tracking where the aliases created with it begin, and end. 

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

# Setup - Configuration

As stated before, BCmdr uses an internal backup in addition to bash file to manage aliases. 

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


# Nesting Commands
One notable useful feature of BCmdr is it's ability to pass commands/bcmdr aliases as arguments to one another.

This feature has limitations for obvious reasons:
- You cannot pass command A to command B if command A is passed command B.
- 
For a better understanding of this problem, consider reading about recursion.


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |