#!/usr/bin/env ruby

require 'erb'

# source = "samples/" + "high-density"

source = "samples/" + ARGV[0]
template = ERB.new( File.read(ARGV[1]) )
images = Dir.entries(source)[3..-1]

images.collect! do |path|
    "../" + source + "/" + path
end

result = template.result(binding)

File.open(ARGV[2], 'w') do |f| 
  f.write(result)
end