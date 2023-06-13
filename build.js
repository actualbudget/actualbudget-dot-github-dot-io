const fs = require("fs");

const docMapping = [
  ["index", ""],
  ["Release-Notes", "releases"],
  ["Developers/project-layout", "contributing/project-layout"],
  ["Developers/preview-builds", "contributing/preview-builds"],
  ["Developers/releasing", "contributing/releasing"],
  ["Developers/Building-Windows", "contributing/windows"],
  ["Installing/overview", "install/"],
  ["Installing/Local/your-own-machine", "install/local"],
  ["Installing/Docker", "install/docker"],
  ["Installing/Fly", "install/fly"],
  ["Installing/fly/Fly.io", "install/fly"],
  ["Installing/fly/Fly-prerequisites", "install/fly"],
  ["Installing/fly/Fly-git", "install/fly"],
  ["Installing/fly/Fly-image", "install/fly"],
  ["Installing/fly/Fly-updating", "install/fly"],
  ["Installing/fly/Fly-persisting", "install/fly"],
  ["Installing/PikaPods", "install/pikapods"],
  ["Installing/Configuration", "config/"],
  ["Installing/HTTPS", "config/https"],
  ["Getting-Started/using-actual/", "tour/"],
  ["Getting-Started/using-actual/files", "tour/files"],
  ["Getting-Started/using-actual/overview", "tour/overview"],
  ["Getting-Started/using-actual/sidebar", "tour/sidebar"],
  ["Getting-Started/using-actual/accounts", "tour/accounts"],
  ["Getting-Started/using-actual/budget", "tour/budget"],
  ["Getting-Started/using-actual/schedules", "tour/schedules"],
  ["Getting-Started/using-actual/settings", "tour/settings"],
  ["Getting-Started/tipstricks", "getting-started/tipstricks"],
  ["Getting-Started/sync", "getting-started/sync"],
  ["Getting-Started/managefiles", "getting-started/managefiles"],
  ["Getting-Started/migration/migration-intro", "migration/"],
  ["Getting-Started/migration/simple-sync", "migration/simple-sync"],
  ["Getting-Started/migration/actual-import", "migration/actual-import"],
  ["Getting-Started/migration/ynab4", "migration/ynab4"],
  ["Getting-Started/migration/nynab", "migration/nynab"],
  ["Budgeting/howitworks", "budgeting/howitworks"],
  ["Budgeting/filters", "budgeting/filters"],
  ["Budgeting/categories", "budgeting/categories"],
  ["Budgeting/rules/rules", "budgeting/rules/"],
  ["Budgeting/rules/rules-custom", "budgeting/rules/custom"],
  ["Budgeting/schedules", "budgeting/schedules"],
  ["Budgeting/returnsandreimbursements", "budgeting/returnsandreimbursements"],
  ["Budgeting/creditcards", "budgeting/creditcards"],
  ["Budgeting/jointaccounts", "budgeting/jointaccounts"],
  ["Accounts/overview", "accounts/"],
  ["Accounts/addaccount", "accounts/"], // merged!
  ["Accounts/reconcile", "accounts/reconciliation"],
  ["Accounts/Transactions/importing-trans", "transactions/importing"],
  ["Accounts/Transactions/bulk-editing-trans", "transactions/bulk-editing"],
  ["Accounts/payees", "transactions/payees"],
  ["Accounts/transfers", "transactions/transfers"],
  ["Reports/overview", "reports/"],
  ["Backup-Restore/Backups", "backup-restore/backup"],
  ["Backup-Restore/Restore", "backup-restore/restore"],
  ["Developers/using-the-API", "api/"],
  ["Developers/API", "api/reference"],
  ["Developers/ActualQL/Overview", "api/actual-ql/"],
  ["Developers/ActualQL/Functions", "api/actual-ql/functions"],
  ["Developers/ActualQL/Examples", "api/actual-ql/examples"],
  ["Advanced/advanced-intro", "advanced/"],
  ["Advanced/Scripts/modify-transfers", "advanced/scripts/modify-transfers"],
  ["FAQ", "faq"],
  ["Troubleshooting/Server", "troubleshooting/server"],
  ["Troubleshooting/SharedArrayBuffer", "troubleshooting/shared-array-buffer"],
  ["Troubleshooting/Troubleshooting-Edge", "troubleshooting/edge-browser"],
  [
    "Advanced/Experimental-Features/goal-templates",
    "experimental/goal-templates",
  ],
  [
    "Advanced/Experimental-Features/monthly-cleanup",
    "experimental/monthly-cleanup",
  ],
  [
    "Advanced/Experimental-Features/report-budget",
    "experimental/report-budget",
  ],
  ["Accounts/connecting-your-bank", "experimental/bank-sync"],
]);

const mapping = [
  ...docMapping.map(([from, to]) => ["docs/" + from, "docs/" + to]),
  ["docs/Contact", "contact"],
];

const template = (url) => /* HTML */ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Refresh" content="0; url=${url}" />
      <title>Actual Budget</title>
    </head>
    <body>
      <p style="margin-block: 4em; text-align: center">
        This page has moved to <a href="${url}">${url}</a>.
      </p>
    </body>
  </html>
`;

fs.rmSync("./public", { recursive: true, force: true });
fs.mkdirSync("./public/docs", { recursive: true });
fs.cpSync("redirect.html", "./public/404.html");
fs.cpSync("redirect.html", "./public/index.html");

for (const [oldPath, newPath] of mapping) {
  const name = `./public/${oldPath}`;
  const content = template("https://actualbudget.org/" + newPath);
  fs.mkdirSync(name, { recursive: true });
  fs.writeFileSync(name + ".html", content);
  fs.writeFileSync(name + "/index.html", content);
}
