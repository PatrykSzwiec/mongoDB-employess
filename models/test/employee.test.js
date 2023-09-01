const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {

	it('should throw an error if no "firstName" arg', async () => {
		const dep = new Employee({}); // create new Employee, but don't set `firstName` attr value
	
		try {
      await dep.validate();
      // If validation succeeds, it should not throw an error, so fail the test
      throw new Error('Validation should have failed');
    } catch (error) {
      const errorMessage = error.errors.firstName;
      expect(errorMessage).to.exist;
      expect(errorMessage.message).to.equal('Path `firstName` is required.');
    }
	});

	it('should throw an error if "firstName" is not a string', async () => {
		const cases = [{}, []];
		for(let firstName of cases) {
			const dep = new Employee({ firstName });
	
			try {
        await dep.validate();
        // If validation succeeds, it should not throw an error, so fail the test
        throw new Error('Validation should have failed');
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.name).to.equal('ValidationError');
        expect(error.message).to.match(/Cast to string failed for value/);
        expect(error.message).to.include('firstName');
      }
    }
	});


	it('should pass, if all is correct', async () => {
		const cases = [
      {
        firstName: 'Thomas',
        lastName: 'Jefferson',
        department: 'Testing'
      },
      {
        firstName: 'Emma',
        lastName: 'Cowell',
        department: 'Testing'
      }
    ]; 
		for(let person of cases) {
			const dep = new Employee( person );
	
			try {
        await dep.validate();

      } catch (error) {
        throw new Error('Validation should have succeeded');
      }
    }
	});

});