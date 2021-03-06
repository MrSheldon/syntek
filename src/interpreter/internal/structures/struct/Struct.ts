import VariableType from '../VariableType';

interface Struct {
  /**
   * Get a variable of this structure
   *
   * @param name - The name of the variable
   * @returns The variable
   */
  get(name: string): Struct;

  /**
   * Set a variable on this structure
   *
   * @param name - The name of the variable
   * @param type - The type of the variable
   * @param value - The value of the variable
   */
  set(name: string, type: VariableType, value: Struct): void;

  /**
   * Call a method on this structure
   *
   * @param name - The name of the method
   * @param params - The parameters to pass to the method
   * @returns The structure the method returns
   */
  callMethod(name: string, params: Struct[]): Struct;

  /**
   * Create a new instance of this structure
   *
   * @param params - The parameters to pass to the constructor
   * @returns The instance
   */
  createNew(params: Struct[]): Struct;

  /**
   * Execute the structure
   *
   * @param params - The parameters that are passed during along with the call
   * @returns The return value of the structure
   */
  exec(params: Struct[]): Struct;
}

export default Struct;
