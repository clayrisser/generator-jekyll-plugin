lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "<%= name %>/version"
Gem::Specification.new do |spec|
  spec.name          = "<%= name %>"
  spec.summary       = "<%= description %>"
  spec.description   = "<%= description %>"
  spec.version       = <%= moduleName %>::VERSION
  spec.authors       = ["<%= authorName %>"]
  spec.email         = ["<%= authorEmail %>"]
  spec.homepage      = "<%= homepage %>"
  spec.licenses      = ["<%= license %>"]
  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r!^(test|spec|features)/!)  }
  spec.require_paths = ["lib"]
  spec.add_dependency "jekyll", "~> 3.0"
  spec.add_development_dependency "rake", "~> 11.0"
  spec.add_development_dependency "rspec", "~> 3.5"
  spec.add_development_dependency "rubocop", "~> 0.52"
end
