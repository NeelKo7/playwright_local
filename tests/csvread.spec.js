const fs = require('fs')
import path from 'path';
import { parse } from 'csv-parse/sync';
import {test} from '@playwright/test'
//Store CSV DATA
const records = parse(fs.readFileSync(path.join(__dirname,"Book1.csv")),{
    columns: true,
    skip_empty_lines: true
})
for(const record of records)
{
  test('Test Case : ${record.TODO_ITEMS}', async ({ page }) => {
      // create a new todo locator
      const newTodo = page.getByPlaceholder('What needs to be done?');
  
      // Create 1st todo.
      await newTodo.fill(TODO_ITEMS[0]);
      await newTodo.press('Enter');

      // Make sure the list only has one todo item.
      await expect(page.getByTestId('todo-title')).toHaveText([
        TODO_ITEMS[0]
      ])
  
      // Create 2nd todo.
      await newTodo.fill(TODO_ITEMS[1]);
      await newTodo.press('Enter');
  
      // Make sure the list now has two todo items.
      await expect(page.getByTestId('todo-title')).toHaveText([
        TODO_ITEMS[0],
        TODO_ITEMS[1]
      ])
    })
}