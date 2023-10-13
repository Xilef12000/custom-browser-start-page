echo "\e[1;35mcleaning up open ports ... \e[0m"
fuser -k 3000/tcp
echo "\e[1;35mStarting node.js Server in background on 0.0.0.0 port 3000 (http://0.0.0.0:3000/) ... \e[0m\n"
node . > log_node.log &