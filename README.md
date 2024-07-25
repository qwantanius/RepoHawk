# RepoHawk

Please implement a "GitHub Scanner" system

Import the following repository to your own GitHub account under 
3 different names (for example repoA, repoB, repoC) to use as test data. 
https://github.com/roma8389/javascript 
Note: you can open a GitHub project for free‌

Create an Apollo GraphQL server. 
The server needs to support 2 scenarios:
  Show List of Repositories
  Show Repository details
  Make sure to accept "developer token" from GitHub as a parameter in the API 
  and return the data that token has access to.
  When fetching detailed repository information, 
  the server should scan up to maximum 2 repositories at a time in parallel.
‌
List of Repositories should contain the following information:
Repo name
Repo size
Repo owner

Repo details should contain the following information:
Repo name
Repo size
Repo owner
Private\public repo
Number of files in the repo
Content of 1 yml file (any one that appear in the repo)
Active webhooks

Notes:
acceptance criteria:
proper functionality
clean code
kiss

Bonus:
Implement a client application to display the list of repositories and 
the content of the repository once it is selected
