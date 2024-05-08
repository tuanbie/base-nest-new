import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { appSettings } from '@common/configs/appSetting';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async sendMail(
    sendTo: string,
    subject: string,
    context: any,
    template: string,
  ) {
    try {
      return this.mailerService.sendMail({
        to: sendTo,
        from: {
          address: appSettings.email_account,
          name: process.env.EMAIL_FROM,
        },
        subject: subject,
        template: template,
        context: context,
      });
    } catch (e) {
      throw new HttpException(
        {
          error: true,
          data: null,
          message: 'Cannot send email',
          code: 0,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
