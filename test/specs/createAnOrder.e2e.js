const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should select the supportive plan', async() =>{
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlan = await page.selectSupportivePlan();
        await expect(supportivePlan).toBeExisting();
    })

    it('should add a credit card', async ()=> {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openPaymentMethodModal();
        await page.addCreditCard('1234 1111 4321','1234');
        const cardRow = await $(page.cardRow); 
        await expect(cardRow).toBeExisting(); 
    
    })

    it('should save a message for the driver', async () => { 

        await browser.url(`/`) 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.enterDriverMessage('Hello'); 
        const commentField = await $(page.commentField); 
        const storedValue = await commentField.getAttribute('value'); 
        await expect(storedValue === 'Hello').toBeTruthy(); 
    
    }) 

    it('should order a Blanket and handkerchiefs', async () => { 
        await browser.url(`/`) 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        await page.selectSupportivePlan();
        await page.addBlanketAndHandkerchiefs();
        await expect($(page.blanketButtonStatus)).toBeChecked(); 

    }) 


    it('should order 2 ice creams', async () => { 
        await browser.url(`/`) 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        await page.selectSupportivePlan(); 
        await page.orderTwoIceCreams(); 
        const iceCreamCount = await $(page.iceCreamCount).getText(); 
        await expect(iceCreamCount).toBe('2'); 

    }) 


    it('should place order with default fields', async () => { 
        await browser.url(`/`) 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        await page.selectSupportivePlan();
        const orderButton = await $(page.orderButton); 
        await orderButton.click(); 
        const carSearchModal = await $(page.carSearchModal); 
        expect(carSearchModal).toBeExisting(); 

    }) 

})


