#!/bin/bash
cd ~/webdev/11ty-justus.ws
EXISTINGSESSION=$(tmux list-sessions | grep 11ty)
if ["$EXISTINGSESSION" = ""]
then
  tmux new -s 11ty -d 'vim'
  tmux split-window -t 11ty
  tmux split-window -h -t 11ty 'npm run serve'
fi
tmux -CC attach -t 11ty
