class ProveedorSingleton {
  static instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.role = null;
    this.instance = this;
  }

  static getInstance() {
    if (!ProveedorSingleton.instance) {
      ProveedorSingleton.instance = new ProveedorSingleton();
    }

    return ProveedorSingleton.instance;
  }

  setRole(role) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
export default ProveedorSingleton;
