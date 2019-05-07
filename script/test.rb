#!/usr/bin/ruby
# -*- coding: UTF-8 -*-
SLEEP_TIME=1.0/4.0
STDOUT.sync = true
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

# puts cmdArgs

# puts _OBJSIZE
# puts _BDVAR
# puts _LIMITVAR
# puts _REPNUM
# puts _RTTVAR1
puts "This script is going to run scripts and analyze the generated data then ouput the result into screen and save the records to log, trace and nsout folders respectively"
sleep(1)
puts "This script is runing WGET!.......Please wait!!This may take a long while!"
sleep(1)
puts "i am here 1"
sleep(1)
puts 'Setting WANem...'
sleep(1)
puts '  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current'
sleep(1)
puts '                                 Dload  Upload   Total   Spent    Left  Speed'
sleep(1)
puts '  0     0    0     0    0     0      0      0 --:--:--  0:00:35 --:--:--     0'

sleep(5)