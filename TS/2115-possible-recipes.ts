function findAllRecipes(
  recipes: string[],
  ingredients: string[][],
  supplies: string[]
): string[] {
  const suppliesMap = supplies.reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {} as Record<string, boolean>);
  const recipesMap = recipes.reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, {} as Record<string, boolean>);
  const possibleRecipes: string[] = [];
  while (true) {
    const anyRecipeCreated = Object.keys(recipesMap).some((recipe, index) => {
      if (recipesMap[recipe]) {
        return false;
      }
      const requiredIngredients = ingredients[index];

      if (requiredIngredients.every((ingredient) => suppliesMap[ingredient])) {
        possibleRecipes.push(recipe);
        recipesMap[recipe] = true;
        suppliesMap[recipe] = true;
        return true;
      }
      return false;
    });

    if (!anyRecipeCreated) {
      break;
    }
  }

  return possibleRecipes;
}

console.log(
  findAllRecipes(
    ['ju', 'fzjnm', 'x', 'e', 'zpmcz', 'h', 'q'],
    [
      ['d'],
      ['hveml', 'f', 'cpivl'],
      ['cpivl', 'zpmcz', 'h', 'e', 'fzjnm', 'ju'],
      ['cpivl', 'hveml', 'zpmcz', 'ju', 'h'],
      ['h', 'fzjnm', 'e', 'q', 'x'],
      ['d', 'hveml', 'cpivl', 'q', 'zpmcz', 'ju', 'e', 'x'],
      ['f', 'hveml', 'cpivl'],
    ],
    ['f', 'hveml', 'cpivl', 'd']
  )
);
