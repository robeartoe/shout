curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.3.2

# deno run --allow-env --allow-net --allow-read ./main.ts &
deno test --allow-net test/main_test.ts
 