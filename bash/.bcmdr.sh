#!/bin/bash

# ---------- BashCommanderJS ----------
# NOTE: Editing the content below is not advised.

function bcmdr() {
	node "$BCMDR_DIR/index.js" "$@"
}

_bcmdr_cmd_completions()
{
	if [ "${#COMP_WORDS[@]}" != "2" ]; then
    return
  fi
  
	COMPREPLY=($(compgen -W "help config guide path list add edit remove" "${COMP_WORDS[1]}"))
}

_bcmdr_rm_completions()
{
  COMPREPLY=($(compgen -W "name=" "${COMP_WORDS[2]}"))
}

_bcmdr_add_edit_completions()
{
  COMPREPLY=($(compgen -W "name= cmd= pargs= dargs= chargs= chain= logs= detach= accepts=" "${COMP_WORDS[2]}"))
}

complete -F _bcmdr_cmd_completions bcmdr
