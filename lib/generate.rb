#!/usr/bin/env ruby

require 'erb'

template = ERB.new( File.read(ARGV[0]) )

source = "samples/" + "high-density"

images = Dir.entries(source)[3..-1]

images.collect! do |path|
    "../" + source + "/" + path
end

result = template.result(binding)

File.open(ARGV[1], 'w') do |f| 
  f.write(result)
end