import DroiError from './error'

export default class DroiObject {
  protected objectId: string;
  protected modifiedTime: Date;
  protected creationTime: Date;
  protected dirtyFlags: boolean;

  getObjectId(): string {
    return this.objectId;
  }
  getCreationTime(): Date {
    return this.creationTime;
  }

  getModifiedTime(): Date {
    return this.modifiedTime;
  }

  save() {
    return
  }
}