import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-case'
        }
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: 
            './prisma/vitest-environment-prisma/schema-test-environment.ts',
        }
      }
    ]
  }
});
