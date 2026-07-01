{ pkgs, ... }:

{
  # Astro + TailwindCSS personal site (Node project)

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22; # Astro 5 supports Node 18.20.8+, 20.3+, 22+
    npm.enable = true;
    pnpm.enable = true; # .npmrc targets pnpm users (shamefully-hoist)
  };

  packages = [
    pkgs.git
  ];

  scripts.dev.exec = "npm run dev";
  scripts.build.exec = "npm run build";
  scripts.preview.exec = "npm run preview";

  enterShell = ''
    echo "drackthor.github.io — Astro dev shell"
    node --version
  '';

  # Lint git-tracked files on commit
  git-hooks.hooks = {
    prettier.enable = true;
  };
}
