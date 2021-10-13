const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const userService = require('../apis/services/user-service');
const aws = require('aws-sdk');


describe('user service methods', () => {

    beforeAll(() => {
        const result = { Item: { userId: '1', name: 'abhishek'}};
        sandbox.stub(aws.DynamoDB.DocumentClient.prototype, 'get').returns({promise: () => result});

    });
    afterAll(() => {
        sandbox.restore();
    });
    it('get a user by userId', async () => {
        const {name} =  await userService.getUserById("1");
        expect(name).toEqual('abhishek');
    });
    
    it('save user, expect user already exist error', async () => {
        try {
            const {name} =  await userService.insertUser({'userId': '1', 'name': 'testing'});
        } catch(e) {
            expect(e.status).toBe(409);
        }
    });
});