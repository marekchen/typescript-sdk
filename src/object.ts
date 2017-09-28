import DroiError from './error'

export default class DroiObject {
  private objectId: string;
  private modifiedTime: Date;
  private creationTime: Date;
  private dirtyFlags: boolean;

  getObjectId(): String {
    return this.objectId;
  }
  getCreationTime(): Date {
    return this.creationTime;
  }

  getModifiedTime(): Date {
    return this.modifiedTime;
  }

  save(): DroiError {
    return
  }
}