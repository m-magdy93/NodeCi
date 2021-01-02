# AdvancedNodeStarter
Starting project for a course on Advanced Node @ Udemy


# Travis CI Flow
  - We push code to github
  - Travis automatically detects pushed code
  - Travis clones the project
  - Travis run tests using .travis.yaml file
  - If tests are ok, Travis sends us an email or do as we wanted

# Trvis file
language: node_js     
node_js:
  - "12"        // node version
dist: trusty    // used linux dist as a virtual machine
services:
  - mongodb
  - redis-server
env:
  - NODE_ENV=ci
  
