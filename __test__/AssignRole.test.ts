import { Role } from "../DB/entities/role";
import { User } from "../DB/entities/user";

const app = require('../index');

const request = require('supertest');

const tempData = {
    userId: 1,
    roleId: 5
}

describe('POST Assign Role to User', () => {

    it('should assign role to User ', async () => {
        const response = await request(app)
            .post('/assignRole')
            .send(tempData)

        expect(response.status).toBe(200);
        expect(response.text).toBe("role assigned succeffully")

        const role = Role.findOneBy({ id: tempData.roleId })
        expect(role).not.toBe(null);
        const user = User.findOneBy({ id: tempData.userId })
        expect(user).not.toBe(null);

    });

    it('should return an error if assigning fails ', async () => {
        const response = await request(app)
            .post('/assignRole')

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error assigning role to user');
    });

})