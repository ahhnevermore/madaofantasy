Soon to be a super website for all of my schemes

Starting with the first real Hay Day trading marketplace with buy and sell orders and whatnot

How to run it yourself
Developed on WSL, so I'd recommend that, or obviously, a real Linux distro
npm install I guess
you need postgres running - systemd simplifies matters
you'll have to create two databases (well,2 if you want to test. otherwise 1 for your dev). Put the connection string in your env file, as per the env.test
run npx prisma generate
run npx prisma db push (you'll have to ensure each database connection string is in the environment)

have fun spamming commands now :D

I'll update how I'm gonna do logging and https and stuff in the future

Note: This project definitely used AI for generating some templates, explaining a lot of code, and review.
I wouldn't say I'm top of the pops with all these libraries. I initially tried to vibe code this project, but was forced to rip out most of it because I can't spend whatever that Bun guy seems to have spent. I've still copied functions especially for the react stuff while rewriting it.