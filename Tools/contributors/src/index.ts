import * as fs from 'fs';

if(!process.env['GITHUB_PAT']) {
  throw new Error('GITHUB_PAT environment variable must be set to a user personal access token.')
}

async function getRepos() {
  const response = await fetch("https://api.github.com/orgs/accordproject/repos", {
    method: "GET",
    headers: {
      Authorization: `token ${process.env['GITHUB_PAT']}`
    }
  });
  return await response.json();
}

async function getRepoContributors(repo: string) {
  const response = await fetch(`https://api.github.com/repos/accordproject/${repo}/stats/contributors`,  {
    method: "GET",
    headers: {
      Authorization: `token ${process.env['GITHUB_PAT']}`
    }
  });
  return await response.json();
}

async function getRepoCommits(repo: any, since: string) {
  const response = await fetch(`https://api.github.com/repos/accordproject/${repo.name}/commits?since=${since}`,  {
    method: "GET",
    headers: {
      Authorization: `token ${process.env['GITHUB_PAT']}`
    }
  });
  return [repo, await response.json()];
}

/**
 * Write the contributors to all Accord Project repositories
 * in Helios Voting fomat to a CSV file:
 * github,<GH_USER_ID>
 * This file can then be uploaded to Helios Voting to create a
 * ballot via CSV upload.
 */
async function writeContributorsToCsv() {
  const repos = await getRepos();
  const promises = repos.map(repo => getRepoContributors(repo.name));
  const results = await Promise.all(promises);
  const names = results.flatMap( r => r.map(c => c.author.login));
  const uniq = [...new Set(names.sort())];
  const lines = uniq.map( githubId => `github,${githubId}`);
  fs.writeFileSync("contributors.csv", lines.join('\n'));
  console.log('Created file contributors.csv.');
}

/**
 * Write a CSV file listing all merged commits in the last week
 */
 async function writeRecentCommitsToCsv() {
  const repos = await getRepos();
  const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const promises = repos.map(repo => getRepoCommits(repo, lastWeek.toISOString()));
  const results = await Promise.all(promises);
  const names = results.flatMap(([repo, commits]) => commits.map(c => `${repo.full_name},${c.commit.message.split('\n')[0]},${c.author.login},${c.html_url}`));
  fs.writeFileSync("recentCommits.csv", names.join('\n'));
  console.log('Created file recentCommits.csv.');
}

writeRecentCommitsToCsv();
writeContributorsToCsv();