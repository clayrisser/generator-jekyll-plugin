# coding: utf-8
require "jekyll"

# https://jekyllrb.com/docs/plugins/#converters

module <%= moduleName %>
  class Converter < Jekyll::Converter
    safe true
    priority :low

    def matches(ext)
      # Does the given extension match this converter’s list of acceptable extensions?
      # Takes one argument: the file’s extension (including the dot).
      # Must return true if it matches, false otherwise.
    end

    def output_ext(ext)
      # The extension to be given to the output file (including the dot).
      # Usually this will be ".html".
    end

    def convert(content)
      # Logic to do the content conversion.
      # Takes one argument: the raw content of the file (without YAML Front Matter).
      # Must return a String.
    end
  end
end
