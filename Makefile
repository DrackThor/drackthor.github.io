.DEFAULT_GOAL := help
.PHONY: help install dev build preview check test lint format clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

dev: ## Start dev server
	pnpm dev

build: ## Build production site to dist/
	pnpm build

preview: ## Preview the production build locally
	pnpm preview

check: ## Type-check + validate content/routes (astro check)
	pnpm exec astro check

test: check ## Alias for check (no runtime test suite yet)

lint: ## Check formatting (prettier, no writes)
	pnpm exec prettier --check .

format: ## Auto-format all files (prettier)
	pnpm exec prettier --write .

clean: ## Remove build output and caches
	rm -rf dist .astro node_modules/.vite
