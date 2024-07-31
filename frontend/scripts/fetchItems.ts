import { chromium } from 'playwright';

interface Item {
  name: string;
  price: string;
  link: string;
}

const fetchItems = async (username: string, password: string, searchStrings: string[]): Promise<Item[]> => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  // Handle MFA if necessary manually and then proceed

  const allItems: Item[] = [];

  for (const searchString of searchStrings) {
    await page.goto(`http://localhost:3000/search?q=${searchString}`);

    // Handle filters if any
    // e.g., await page.selectOption('select[name="filter"]', 'price-asc');

    const items: Item[] = await page.evaluate(() => {
      const itemsList: Item[] = [];
      document.querySelectorAll('.item').forEach(item => {
        itemsList.push({
          name: item.querySelector('.name')?.textContent || '',
          price: item.querySelector('.price')?.textContent || '',
          link: (item.querySelector('a') as HTMLAnchorElement)?.href || '',
        });
      });
      return itemsList;
    });

    allItems.push(...items);
  }

  await browser.close();
  return allItems;
};

const [username, password, searchStringsStr] = process.argv.slice(2);
const searchStrings: string[] = JSON.parse(searchStringsStr);

fetchItems(username, password, searchStrings).then(items => {
  console.log(JSON.stringify(items, null, 2));
}).catch(console.error);
