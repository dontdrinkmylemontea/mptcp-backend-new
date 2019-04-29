#!/usr/bin/ruby
# -*- coding: UTF-8 -*-
SLEEP_TIME=1.0/4.0
prefix = "."
iface="eth0"
wanemip1="192.168.3.25"
serverip="192.168.1.45" # MPTCP
rttvar1="20"  #CONSISTENT WITH 
rttvar2="20"
runtest = 1

# 命令行输入变量
cmdArgs = Hash[ ARGV.flat_map{|s| s.scan(/--?([^=\s]+)(?:=(\S+))?/) } ]

_OBJSIZE = cmdArgs["objsize"].split(",")
_BDVAR = cmdArgs["bdvar"].split(",")
_LIMITVAR = cmdArgs["limitvar"].split(",")
_REPNUM = cmdArgs["repnum"]
_RTTVAR1 = cmdArgs["rttvar1"]

puts _OBJSIZE
puts _BDVAR
puts _LIMITVAR
puts _REPNUM
puts _RTTVAR1