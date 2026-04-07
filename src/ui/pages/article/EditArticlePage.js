import { test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async removeArticleTags(tags) {
    await test.step(`Remove article tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.page.getByText(tags[i]).locator('i').click();
      }
    });
  }

}
