require "jekyll"

# https://jekyllrb.com/docs/plugins/#hooks

module <%= moduleName %>
  Jekyll::Hooks.register :posts, :post_render do |post|
    # code to call after Jekyll renders a post
  end
end
