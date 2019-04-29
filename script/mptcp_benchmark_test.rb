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

# 输出一行说明
print <<EOF
  This script is going to run scripts and analyze the generated data,
  then ouput the result into screen,
  and save the records to log,
  trace and nsout folders respectively
EOF

for time in (1..1)
  def getfile(ip,wanemip1,rtt_var1,bdwth_var,limit_var,objt_var,id)
    a=`curl -s \"http://#{wanemip1}/?delay=#{rtt_var1}&bw=#{bdwth_var}&limit=#{limit_var}\"`
    puts a
    puts "Setting WANem..."
    sleep(0.04)
    tmp1=`curl #{wanemip1}/showstatus.php?iface=eth0`
    puts "Setting is Done..Now checking the status of the WANem...."
    tmparray1=tmp1.split('|')
    puts tmparray1
    while tmparray1[1]!=rtt_var1 or tmparray1[3]!=limit_var
      a=`curl -s \"http://#{wanemip1}/?delay=#{rtt_var1}&bw=#{bdwth_var}\"`
      puts "Maybe some problem happens of wanem1 because setting is uncompleted!"
      tmp1=`curl #{wanemip1}/WANem/showstatus.php?iface="eth0"`
      tmparray1=tmp1.split('|')
    end
    puts "WANem1 Delay=#{tmparray1[1]} Bandwidth=#{tmparray1[2]} limit=#{tmparray1[3]} FileSize=#{objt_var}"
    puts "Setting successfully"
    system("sudo wget -b -O /dev/null http://#{ip}/#{objt_var} -o a-#{id}.txt")       
  end
  puts "This script is runing WGET!...Please wait!!This may take a long while!"
  Dir.mkdir("./out-#{time}") unless File.exist?("./out-#{time}")
  Dir.mkdir("./log-#{time}") unless File.exist?("./log-#{time}")
  Dir.mkdir(prefix) unless File.exist?(prefix)

  if(runtest==1)
    for objsize in _OBJSIZE
      for bdvar in _BDVAR
        for limitvar in _LIMITVAR
          for repnum in (1.._REPNUM)
            getfile(serverip,wanemip1,_RTTVAR1,bdvar,limitvar,objsize,repnum)
          end
          puts "<<<<<<<<<<<<<<<<<<<"
          grepresutls = `sudo ps -ef | grep wget`
          puts ">>>>>>>>>>>>>>>>>>>"
          puts grepresutls
          puts "<<<<<<<<<<<<<<<<<<<"
          while ("#{grepresutls}".include?"http://192.168.1.45")
            sleep(0.1)
            grepresutls=`sudo ps -ef | grep wget`
          end
          for repnum2 in (1..5)
            system("cat a-#{repnum2}.txt | grep -E MB\\|KB | cut -d \\( -f 2 | cut -d \\) -f 1 > #{prefix}/#{objsize}-#{limitvar}.txt")
          end
        end
      end
    end
  end
  puts "Wget is done..."
  puts "Analyzing the data..."
  Dir.mkdir("log-#{time}") unless File.exist?("log-#{time}")
  out=File.new("log-#{time}/log-#{time}","w")
  puts "The test is finally finished"
  out.close
end