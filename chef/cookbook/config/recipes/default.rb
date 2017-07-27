execute 'migrate table' do
  command "cd /Users/user/backend && db-migrate create meeting"
end

execute 'schema' do
  command "cd /Users/user/backend && db-migrate up"
end

execute 'run fixtures' do
  command "cd /Users/user/backend && node fixture.js"
end