execute 'install npm modules' do
  command "cd /Users/user/backend && npm install"
end

execute 'run grunt' do
  command "cd /Users/user/backend && grunt"
end