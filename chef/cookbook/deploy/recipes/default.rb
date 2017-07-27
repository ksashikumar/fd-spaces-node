package "mysql" do
  action :install
end

package "nodejs" do
	action :install
end

execute 'install grunt' do
  command "npm install -g grunt-cli"
  not_if "npm --no-color -g ls 'grunt-cli' 2> /dev/null | grep 'grunt-cli'"
end