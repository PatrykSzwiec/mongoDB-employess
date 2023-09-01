const Department = require('../department.model');
const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

	before(async () => {
		try {
			await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
		} catch(err) {
			console.error(err);
		}
	});


	describe('Reading data', () => {
		before(async () => {
			const testDepOne = new Employee({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			await testDepOne.save();

			const testDepTwo = new Employee({ firstName: 'John #2', lastName: 'Employee #2',	department: 'Testing #2' });
			await testDepTwo.save();
		});

		it('should return all the data with "find" method', async () => {
			const employees = await Employee.find();
			const expectedLength = 2;
			expect(employees.length).to.be.equal(expectedLength);
		});

		it('should return a proper document by "firstName" with "findOne" method', async () => {
			const employee = await Employee.findOne({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			const expectedFirstName = 'John #1';
			expect(employee.firstName).to.be.equal('John #1');
		});

    it('should populate "department" with actual department data', async () => {
      const testDepartment = new Department({ name: 'Testing Department' });
      await testDepartment.save();
  
      const testEmployee = new Employee({
        firstName: 'John',
        lastName: 'Employee',
        department: testDepartment._id,
      });
      await testEmployee.save();
  
      const populatedEmployee = await Employee.findById(testEmployee._id).populate('department');
  
      expect(populatedEmployee.department.name).to.equal('Testing Department');
    });

		after(async () => {
			await Employee.deleteMany();
      await Department.deleteMany();
		});
	});


	describe('Creating data', () => {
		beforeEach(async () => {
			const testDepOne = new Employee({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			await testDepOne.save();
		
			const testDepTwo = new Employee({ firstName: 'John #2', lastName: 'Employee #2',	department: 'Testing #2' });
			await testDepTwo.save();
		});

		it('should insert new document with "insertOne" method', async () => {
			const employee = new Employee({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			await employee.save();
			expect(employee.isNew).to.be.false;
		});
	
		after(async () => {
			await Employee.deleteMany();
		});
	});


	describe('Updating data', () => {
		beforeEach(async () => {
			const testDepOne = new Employee({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			await testDepOne.save();
		
			const testDepTwo = new Employee({ firstName: 'John #2', lastName: 'Employee #2',	department: 'Testing #2' });
			await testDepTwo.save();
		});

		it('should properly update one document with "updateOne" method', async () => {
			await Employee.updateOne({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' }, { $set: { firstName: '=John #1=', lastName: '=Employee #1=',	department: '=Testing #1=' }});
			const updatedEmployee = await Employee.findOne({ firstName: '=John #1=', lastName: '=Employee #1=',	department: '=Testing #1=' });
			expect(updatedEmployee).to.not.be.null;
		});
	
		it('should properly update one document with "save" method', async () => {
			const employee = await Employee.findOne({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			employee.firstName = '=John #1=';
			employee.lastName = '=Employee #1=';
			employee.department = '=Testing #1=';
			await employee.save();
		
			const updatedEmployee = await Employee.findOne({ firstName: '=John #1=', lastName: '=Employee #1=',	department: '=Testing #1=' });
			expect(updatedEmployee).to.not.be.null;
		});
	
		it('should properly update multiple documents with "updateMany" method', async () => {
			await Employee.updateMany({}, { $set: { firstName: 'Updated!', lastName: 'Updated!',	department: 'Updated!' }});
			const employees = await Employee.find();
			expect(employees.length).to.be.equal(2);
		});
	
		afterEach(async () => {
			await Employee.deleteMany();
		});
	});


	describe('Removing data', () => {
		beforeEach(async () => {
			const testDepOne = new Employee({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			await testDepOne.save();
		
			const testDepTwo = new Employee({ firstName: 'John #2', lastName: 'Employee #2',	department: 'Testing #2' });
			await testDepTwo.save();
		});

		it('should properly remove one document with "deleteOne" method', async () => {
			await Employee.deleteOne({ firstName: 'John #1', lastName: 'Employee #1',	department: 'Testing #1' });
			const deletedEmployee = await Employee.findOne({ firstName: 'John #1' });
			expect(deletedEmployee).to.be.null;
		});
	
		it('should properly remove multiple documents with "deleteMany" method', async () => {
			await Employee.deleteMany({});
			const employees = await Employee.find();
			expect(employees.length).to.be.equal(0);
		});
	
		afterEach(async () => {
			await Employee.deleteMany();
		});
	});

});