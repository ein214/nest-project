import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';
import emailConfig from '../config/emailConfig';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(email: string, signupVerifyToken: string) {
    const baseUrl = this.config.baseUrl;

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const options: EmailOptions = {
      to: email,
      subject: '회원가입을 축하합니다.',
      html: `
        <h1>회원가입을 축하합니다.</h1>
        <p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>
        <form action="${url}" method="post">
          <button type="submit">이메일 인증하기</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(options);
  }
}
