# Helios Voting

This repo uses the GitHub API to retrieve all contributors to Accord Project repositories and then creates a CSV file containing a line for each contributor. This file can then be uploaded to 
Helios Voting and used as the basis for defining the voters eligible for a ballot.

## Install

Note that this code requires Node 17+.

```console
npm i
```

## Running

Set the `GITHUB_PAT` environment variable to the value of a GitHub Personal Access Token
that has read permissions to all the Accord Project repositories as well as their users.

```console
npm start
```

A file `contributors.csv` is created which can be manually uploaded to Helios Voting to define a ballot for an election.

Note that the `contributors.csv` file should be committed to this repository so we have an auditable log of who was invited to cast a vote in an election.