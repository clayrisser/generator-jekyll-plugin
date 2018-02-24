require "jekyll"

# https://jekyllrb.com/docs/plugins/#commands

module <%= moduleName %>
  class Command < Jekyll::Command
    def init_with_program(prog)
      # This method accepts one parameter, the Mercenary::Program instance, which is the Jekyll program itself.
      # Upon the program, commands may be created using the above syntax.
      # For more details, visit the Mercenary repository on GitHub.com.
    end
  end
end
