# Helios Voting

This repo uses the GitHub API to retrieve all contributors to Accord Project repositories and then creates a CSV file containing a line for each contributor. This file can then be uploaded to 
Helios Voting and used as the basis for defining the voters eligible for a ballot.

## Install

Note that this code required Node 17+.

```console
npm i
```

## Running

Set the `GITHUB_PAT` environment variable to the value of a GitHub Personal Access Token
that has read permissions to all the Accord Project repositories.

```console
npm start
```

A file `contributors.csv` is created that can be uploaded to Helios Voting.