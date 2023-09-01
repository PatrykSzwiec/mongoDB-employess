const Department = require('../department.model');
const expect = require('chai').expect;

describe('Department', () => {

  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    try {
      await dep.validate();
      // If validation succeeds, it should not throw an error, so fail the test
      throw new Error('Validation should have failed');
    } catch (error) {
      const errorMessage = error.errors.name.message;
      expect(errorMessage).to.exist;
    }
  });

  it('should throw an error if "name" is not a string', async () => {
		const cases = [{}, []];
		for(let name of cases) {
			const dep = new Department({ name });
	
			try {
        await dep.validate();
        // If validation succeeds, it should not throw an error, so fail the test
        throw new Error('Validation should have failed');
      } catch (error) {
        const errorMessage = error.errors.name.message;
        expect(errorMessage).to.exist;
      }
    }
	});

  it('should throw an error if "name" is too short or too long', async () => {

    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // we test various cases, some of them are too short, some of them are too long
    for(let name of cases) {
      const dep = new Department({ name });
  
      try {
        await dep.validate();
        // If validation succeeds, it should not throw an error, so fail the test
        throw new Error('Validation should have failed');
      } catch (error) {
        const errorMessage = error.errors.name.message;
        expect(errorMessage).to.exist;
      }
    }
  
  });

  it('should not throw an error if "name" is okay', async () => {

    const cases = ['Management', 'Human Resources'];
    for(let name of cases) {
      const dep = new Department({ name });
  
      try {
        await dep.validate();
        // If validation fails, it should not throw an error, so fail the test
      } catch (error) {
        throw new Error('Validation should have succeeded');
      }
    }
  });

});
