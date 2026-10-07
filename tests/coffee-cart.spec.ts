import { test, expect } from '@playwright/test';

// App under test: Coffee Cart — https://seleniumbase.io/coffee/
// Routes: menu — /coffee/, cart — /coffee/cart
//
// This file is a structural skeleton only. Test bodies are intentionally
// left as test.skip(true, 'TODO: ...') placeholders — no locators or
// expect() assertions are implemented yet. Replace each TODO with the
// real steps/assertions described in the comment.

test.describe('Coffee Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/coffee/');
  });

  test('Smoke: menu loads with drinks list and Total button @smoke', async ({ page }) => {
    //verify the cup list is visible and the Total/checkout button is visible
    await expect(page.getByLabel('Espresso',{exact:true})).toBeVisible();
    await expect(page.getByLabel('Proceed to checkout')).toBeVisible();
  });

  test('Adding two different drinks updates the header cart counter and Total', async ({
    page,
  }) => {
    // click two different cups (e.g. by aria-label/data-test), then assert
    //header "cart (2)" text and that Total equals the sum of the two drink prices
    await page.getByLabel('Espresso',{exact:true}).click();
    await page.getByLabel('Mocha').click();

    await expect(page.getByLabel('Cart page')).toContainText('2');
    await expect(page.getByLabel('Proceed to checkout')).toContainText('18');
  });

  test('Cart page lists exactly the added items', async ({ page }) => {
    // add 2 drinks, navigate to /coffee/cart, assert item rows locator.toHaveCount(2)
    await page.getByLabel('Espresso',{exact:true}).click();
    await page.getByLabel('Mocha').click();

    await page.getByLabel('Cart page').click();

    await expect(page.getByLabel('Remove all')).toHaveCount(2);
  });

  test('Increasing item quantity on the cart page updates counter and Total', async ({ page }) => {
    //on /coffee/cart, click the "+" control for one item, then assert
    //header cart counter and Total reflect the new quantity/sum
    await page.getByLabel('Espresso',{exact:true}).click();

    await page.getByLabel('Cart page').click();

    await expect(page.getByLabel('Proceed to checkout')).toContainText('10');
    await expect(page.getByLabel('Cart page')).toContainText('1');

    await page.getByLabel('Add one Espresso').last().click();

    await expect(page.getByLabel('Cart page')).toContainText('2');
    await expect(page.getByLabel('Proceed to checkout')).toContainText('20');
  });

  test('Empty cart shows no items on a fresh session', async ({ page }) => {
    //navigate straight to /coffee/cart without adding anything, assert
    //item list locator.toHaveCount(0) (or the list container is hidden)

    await page.getByLabel('Cart page').click();

    await expect(page.getByLabel('Remove all')).toHaveCount(0);
  });

  test('Payment modal shows Name, Email and Submit', async ({ page }) => {
    //click the Total/Pay button, assert the payment modal is visible,
    //then use expect.soft for the Name field, Email field and Submit button
    await page.getByLabel('Proceed to checkout').click();

    await expect(page.getByLabel('Payment form')).toBeVisible();
    await expect.soft(page.getByText('Name', { exact: true })).toBeVisible();
    await expect.soft(page.getByText('Email', { exact: true })).toBeVisible();
    await expect.soft(page.getByText('submit')).toBeVisible();
  });

  test.describe('Optional', () => {
    test('Promo dialog after a 3rd drink is dismissed with No', async () => {
      test.skip(
        true,
        'TODO (bonus): add 3 drinks so the promo dialog appears, click "No", ' +
          'then assert the scenario completes (e.g. cart still has 3 items)',
      );
    });

    test('Completed payment form shows a success message', async () => {
      test.skip(
        true,
        'TODO (bonus): open the payment modal, fill Name and Email, click Submit, ' +
          'assert a success message/state appears',
      );
    });

    test('Skipped on a specific browser with a documented reason', async ({ browserName }) => {
      test.skip(
        browserName === 'webkit',
        'webkit project is disabled in playwright.config.ts for this assignment',
      );
      test.skip(true, 'TODO (bonus): implement the real assertions for this scenario');
    });

    test('Annotated with a tracking issue', async () => {
      const issueUrl = 'https://example.com/issues/123';
      test.info().annotations.push({ type: 'issue', description: issueUrl });
      test.skip(true, 'TODO (bonus): implement the real assertions for this scenario');
    });
  });
});
