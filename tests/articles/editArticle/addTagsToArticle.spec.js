import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Add tags to article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Add ${testNameEnding} to article`,
      async ({ homePage, createArticlePage, viewArticlePage,
               editArticlePage, logger, page }) => {
        const article = generateNewArticleData(logger, tagsNumber);

        await homePage.clickNewArticleLink();
        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.fillTextField(article.text);
        await createArticlePage.clickPublishArticleButton();

        await viewArticlePage.clickEditArticleButton();
        await editArticlePage.fillTagsField(article.tags);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.waitForArticlePage();
        await viewArticlePage.reload();
        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
        await viewArticlePage.assertArticleTagsAreVisible(article.tags);
      });
  });
});
