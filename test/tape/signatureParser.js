import {test} from 'tape';
import emailParseUtil from '../../src/utils/emailParseUtil.js';

(function () {
    'use strict';

    test('Signature parser should correctly strip out Zoho Support replies', function (expect) {
        const originalEmail = `<td><div dir="ltr">Can you advise whether this has been done?</div><div><br clear="all"><div><div><div dir="ltr"><div>Jeremy Nagel<br></div><div><i>Lead Developer</i><br></div><div><a href="http://Nuanced.IT" target="_blank">Nuanced IT</a><br></div><div><br></div><div>E: <a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a><br></div><div>M: (+61) 0414 885 787<br></div><div><div>Skype: jeznag<br><br><a href="http://Nuanced.IT" target="_blank"></a></div></div></div></div></div>
    <br><div>On Tue, Sep 22, 2015 at 8:27 PM, Jeremy Nagel <span dir="ltr">&lt;<a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr">Hi Ankit,<div>how did you go with this?</div></div><div><br clear="all"><div><div><div dir="ltr"><div>Jeremy Nagel<br></div><div><i>Lead Developer</i><br></div><div><a href="http://Nuanced.IT" target="_blank">Nuanced IT</a><br></div><div><br></div><div>E: <a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a><br></div><div>M: <a>(+61) 0414 885 787</a><br></div><div><div>Skype: jeznag<br><br><a href="http://Nuanced.IT" target="_blank"></a></div></div></div></div></div><div><div>
    <br><div>On Wed, Jul 29, 2015 at 4:23 PM, Carmen Sabre <span dir="ltr">&lt;<a href="mailto:carmen.s@searchresults.com.au" target="_blank">carmen.s@searchresults.com.au</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><p dir="ltr">Ok yes go ahead thank you </p><div><div>
    <div>On 29/07/2015 4:10 pm, "Vishal Systango" &lt;<a href="mailto:vishal@systematixtechnocrates.com" target="_blank">vishal@systematixtechnocrates.com</a>&gt; wrote:<br type="attribution"><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr"><div>Yes this is the option 3 and estimation is 20hours.</div></div><div><br><div>On Tue, Jul 28, 2015 at 5:28 AM, Carmen Sabre <span dir="ltr">&lt;<a href="mailto:carmen.s@searchresults.com.au" target="_blank">carmen.s@searchresults.com.au</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr">Hi Vishal, Jeremy,&nbsp;<div><br></div><div>Can you confirm is this option 3? And the amount for the est. 20 hours?&nbsp;</div></div><div><div><div><br><div>On 24 July 2015 at 17:46, Jeremy Nagel <span dir="ltr">&lt;<a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><p dir="ltr">Oh yeah good point. Ok cool I'm happy with that. Carmen can you approve 20 hours?</p><span>
    <p dir="ltr">Sent from my portable messenger pigeon launcher. Please forgive brevity and spelling mistakes. The pigeon has a habit of pecking off important letters.</p>
    </span><div><div><div>On 24 Jul 2015 5:28 pm, "Vishal Systango" &lt;<a href="mailto:vishal@systematixtechnocrates.com" target="_blank">vishal@systematixtechnocrates.com</a>&gt; wrote:<br type="attribution"><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr"><br>I thought that the renewal invoice is already created as soon as the upfront invoice is created.<div>Is the flow changed ?</div><div><br></div><div>Between for this zoho creator will be better option because we can easily find out if all the subform (splits)&nbsp;</div><div>have status = paid and then can push it to original invoice.<br><br></div><div>Thanks<br></div></div><div><br><div>On Fri, Jul 24, 2015 at 2:28 AM, Jeremy Nagel <span dir="ltr">&lt;<a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><p dir="ltr">We'd also need to make sure that the original invoice gets marked as paid after the split payments are made so that a renewal invoice can be created.</p><span>
    <p dir="ltr">Sent from my portable messenger pigeon launcher. Please forgive brevity and spelling mistakes. The pigeon has a habit of pecking off important letters.</p>
    </span><div><div><div>On 23 Jul 2015 8:41 pm, "Vishal Systango" &lt;<a href="mailto:vishal@systematixtechnocrates.com" target="_blank">vishal@systematixtechnocrates.com</a>&gt; wrote:<br type="attribution"><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr">Hi Jeremy/Carmen,<div><br></div><div>Here are my assumptions and estimates regarding each options.</div><div><br></div><div><b>Assumption :</b>&nbsp;&nbsp;</div><div>1.
     We have to do this only for existing invoices which are already present
     in zoho and not for the ones that will be created from sales portal.&nbsp;</div><div>2.
     This will be done only for upfront invoices means the splits will not 
    be renewable (renewal invoice is created from the original upfront 
    invoice).</div><div><br></div><div><b>Estimates :&nbsp;</b></div><div><b><br></b></div><div><b>Option 1 :&nbsp;</b></div><div><span style="font-size:13px">Have
     a link or a custom button that would open a web page where they could 
    specify the split using the ui &nbsp;already built in sales portal. The 
    original invoice would be marked with a status: "split" and new invoices
     would be created in the invoice module.</span></div><div><span style="font-size:13px"><font color="#ff0000">Estimates for this will be [12 - 15 hours]</font></span></div><div><span style="font-size:13px"><br></span></div><div><div><b>Option 2 :&nbsp;</b></div><div><span style="font-size:13px">Have
     a link or a custom button that would open a web page where they could 
    specify the split using the ui &nbsp;already built in sales portal. The 
    original invoice would be marked with a status: "split" and&nbsp;</span></div><div><span style="font-size:13px">new invoices would be created in the a new custom module "</span><span style="font-size:13px"><font color="#000000">Invoice Splits</font></span><span style="font-size:13px">".</span></div><div><div style="font-size:13px"><font color="#000000">The custom module "Invoice Splits" will have a lookup to "Invoices" module.<br>When
     split is selected for Upfront Invoice we can create as many records as 
    number of splits in "Invoice Splits" which will point to upfront invoice
     through&nbsp;</font><span style="color:rgb(0,0,0)">invoice lookup &nbsp;(through this all the splits will be visible inside the original upfront invoice)</span></div></div><span><div style="font-size:13px"><div><font color="#000000">We will have amount , due date, paid date in this "Invoice Splits"</font></div><div><font color="#000000">and can trigger workflow for only "Invoice Splits" for payment.</font></div></div></span><div><span style="font-size:13px"><font color="#ff0000">Estimates for this will be [15 - 18 hours]</font></span></div></div><div><span style="font-size:13px"><br></span></div><div><span style="font-size:13px"><b>Option 3 : (better option suggested by Jeremy)<br></b></span><span style="font-size:13px">Have a link or a custom button that would open</span><span style="font-size:13px">&nbsp;a Zoho creator app.&nbsp;</span></div><div><span style="font-size:13px">The creator record will be link to original invoice and there will be subform to specify the splits.</span><span style="font-size:13px"><b><br></b></span></div><div><span style="font-size:13px">Can trigger payment workflow from creator itself on the basis of due date.</span></div><div><span style="font-size:13px"><font color="#ff0000">Estimates for this will be [18 - 20 hours]<br><br></font></span></div><div><span style="font-size:13px"><font color="#ff0000"><span style="color:rgb(0,0,0)">Thanks</span><br></font></span></div></div><div><br><div>On Thu, Jul 23, 2015 at 1:49 AM, Jeremy Nagel <span dir="ltr">&lt;<a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><p dir="ltr">Can you give estimates so she can make a decision based on the effort required?</p><span>
    <p dir="ltr">Sent from my portable messenger pigeon launcher. Please forgive brevity and spelling mistakes. The pigeon has a habit of pecking off important letters.</p>
    </span><div><div><div>On 22 Jul 2015 10:56 pm, "Vishal Systango" &lt;<a href="mailto:vishal@systematixtechnocrates.com" target="_blank">vishal@systematixtechnocrates.com</a>&gt; wrote:<br type="attribution"><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr">Ok Jeremy got it.<br><br>All the options can be possible.<br><br><div>@Carmen, Could you can confirm that which of the options best suits for you and we will implement that.<br><br></div><div>Thanks<br></div></div><div><br><div>On Wed, Jul 22, 2015 at 4:52 PM, Jeremy Nagel <span dir="ltr">&lt;<a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><p dir="ltr">A Zoho creator app could do the job too. Have a sub form to specify splits. Link to app from original invoice.</p><span>
    <p dir="ltr">Sent from my portable messenger pigeon launcher. Please forgive brevity and spelling mistakes. The pigeon has a habit of pecking off important letters.</p>
    </span><div><div><div>On 22 Jul 2015 9:16 pm, "Jeremy Nagel" &lt;<a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a>&gt; wrote:<br type="attribution"><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><p dir="ltr">The difference is that it would be used for existing clients who already have an invoice. They can't pay the invoice all at once so request that the payment be split.</p>
    <p dir="ltr">I was thinking a link or a custom button that would open a web page where they could specify the split using the ui you already built. The original invoice would be marked with a status: "split" and new invoices would be created.</p>
    <p dir="ltr">Sent from my portable messenger pigeon launcher. Please forgive brevity and spelling mistakes. The pigeon has a habit of pecking off important letters.</p>
    <div>On 22 Jul 2015 6:06 pm, "Vishal Systango" &lt;<a href="mailto:vishal@systematixtechnocrates.com" target="_blank">vishal@systematixtechnocrates.com</a>&gt; wrote:<br type="attribution"><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr">Hi,<br><br>The sales portal already have split payment feature which creates as many invoices as the number of splits selected.<br><br><div>Can you please confirm what is there exact requirement ? How they want the payment to be splitted ? is it regarding manually&nbsp;</div><div>created invoices for which they want the split ?<br><br></div><div>Between we can have an alternative for split payment creating multiple invoices.</div><div>We can have a custom module "Invoice Splits" which will have a lookup to "Invoices" module.<br>When split is selected in Upfront Invoice we can create records in "Invoice Splits" which will point to upfront invoice through</div><div>invoice lookup.</div><div><br></div><div>We will have amount , due date, paid date in this "Invoice Splits"</div><div>and can trigger workflow for only "Invoice Splits" for payment.<br><br></div><div>Thanks<br></div></div><div><br><div>On Wed, Jul 22, 2015 at 8:01 AM, Jeremy Nagel <span dir="ltr">&lt;<a href="mailto:jeremy.nagel@nuanced.it" target="_blank">jeremy.nagel@nuanced.it</a>&gt;</span> wrote:<br><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><p dir="ltr">This is probably something to talk about with ankit. Best option is to use sales portal or a custom app to do this.</p>
    <p dir="ltr">Sent from my portable messenger pigeon launcher. Please forgive brevity and spelling mistakes. The pigeon has a habit of pecking off important letters.</p>
    <div>On 22 Jul 2015 9:28 am, "Carmen Sabre" &lt;<a href="mailto:carmen.s@searchresults.com.au" target="_blank">carmen.s@searchresults.com.au</a>&gt; wrote:<br type="attribution"><blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex"><div dir="ltr"><div><br></div>Hi Jeremy,&nbsp;<div>Can you please let me know how you can do split payments within Zoho. Currently the staff are manually having to do multiple invoices.&nbsp;</div><div><br></div><div>This was built in sales portal - can it be done in Zoho.&nbsp;</div><div><br></div><div>Its very time consuming at the moment.&nbsp;<br clear="all"><div><br></div>-- <br><div><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div dir="ltr"><div dir="ltr"><div dir="ltr"><div><p><br clear="all"><br>-- <br></p><div dir="ltr">--&nbsp;<br><div dir="ltr"><div dir="ltr"><div>Kind Regards,</div><div><br></div><div><br></div><div><br></div><div><br></div><div><span style="border-collapse:collapse">Carmen Sabre</span></div><div><span style="border-collapse:collapse"><br></span></div><div><span style="border-collapse:collapse">Financial Controller</span></div><div><span style="border-collapse:collapse"><br></span></div><div><span style="border-collapse:collapse"><b>CERTIFIED GOOGLE ADWORDS PROFESSIONAL</b><br><br></span></div><div>1300 884 998<br><p></p><p><a href="http://www.searchresults.com.au/" target="_blank">http://www.searchresults.com.au/</a></p><p><img src="http://searchresults.com.au/wp-content/uploads/2014/02/logo5.png"><br><br>Copyright © 2015 SEARCH RESULTS Pty Ltd. All Rights Reserved.&nbsp;<br></p><p></p><div>&nbsp;<br><br></div><font face="times new roman, serif" size="1">The
     information contained in this e-mail is private and confidential and 
    only intended to the recipient of this email.&nbsp; Search Results have, in 
    preparing this information used our best endeavours to ensure that the 
    information contained therein is true and accurate, but accept no 
    responsibility and disclaim all liability in respect of any errors, 
    inaccuracies or misstatements contained herein. All parties interested 
    in any Search Results product and /or service should make their own 
    inquiries to verify the information contained herein. If you are not the
     intended recipient, you may not disclose or use the information in this
     e-mail in any way.&nbsp; Search Results does not guarantee the integrity of 
    any e-mails or attached files. The views or opinions expressed are the 
    author's own and may not reflect the views or opinions of Search Results
     Specialists Pty Ltd.&nbsp;Search Results Specialists Pty Ltd&nbsp;is an 
    independent service company that has no association or affiliation with 
    Google. Google, AdWords and Google Places are registered or unregistered
     trademarks, and are the property of, Google&nbsp;Inc. or related entity.</font></div></div></div></div><p></p><div><br></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>
    </div></div>
    </blockquote></div>
    </blockquote></div><br><br clear="all"><br>-- <br><div><div dir="ltr"><div><div dir="ltr"><div>-<br>Regards<br></div>Vishal<br></div><div dir="ltr"><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.systango.com/" target="_blank"><img src="http://www.systematixtechnocrates.com/logo-signature.png" border="0"></a></div><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.codepunt.today/" target="_blank"><img src="http://systango.com/img/promotions/CodePunt%20Banner%20B.jpg" height="52" width="420"></a></div></div></div></div></div>
    </div>
    </blockquote></div>
    </blockquote></div>
    </div></div></blockquote></div><br><br clear="all"><br>-- <br><div><div dir="ltr"><div><div dir="ltr"><div>-<br>Regards<br></div>Vishal<br></div><div dir="ltr"><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.systango.com/" target="_blank"><img src="http://www.systematixtechnocrates.com/logo-signature.png" border="0"></a></div><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.codepunt.today/" target="_blank"><img src="http://systango.com/img/promotions/CodePunt%20Banner%20B.jpg" height="52" width="420"></a></div></div></div></div></div>
    </div>
    </blockquote></div>
    </div></div></blockquote></div><br><br clear="all"><br>-- <br><div><div dir="ltr"><div><div dir="ltr"><div>-<br>Regards<br></div>Vishal<br></div><div dir="ltr"><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.systango.com/" target="_blank"><img src="http://www.systematixtechnocrates.com/logo-signature.png" border="0"></a></div><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.codepunt.today/" target="_blank"><img src="http://systango.com/img/promotions/CodePunt%20Banner%20B.jpg" height="52" width="420"></a></div></div></div></div></div>
    </div>
    </blockquote></div>
    </div></div></blockquote></div><br><br clear="all"><br>-- <br><div><div dir="ltr"><div><div dir="ltr"><div>-<br>Regards<br></div>Vishal<br></div><div dir="ltr"><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.systango.com/" target="_blank"><img src="http://www.systematixtechnocrates.com/logo-signature.png" border="0"></a></div><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.codepunt.today/" target="_blank"><img src="http://systango.com/img/promotions/CodePunt%20Banner%20B.jpg" height="52" width="420"></a></div></div></div></div></div>
    </div>
    </blockquote></div>
    </div></div></blockquote></div><br><br clear="all"><div><br></div>-- <br><div><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div dir="ltr"><div dir="ltr"><div dir="ltr"><div><p><br clear="all"><br>-- <br></p><div dir="ltr">--&nbsp;<br><div dir="ltr"><div dir="ltr"><div>Kind Regards,</div><div><br></div><div><br></div><div><br></div><div><br></div><div><span style="border-collapse:collapse">Carmen Sabre</span></div><div><span style="border-collapse:collapse"><br></span></div><div><span style="border-collapse:collapse">Financial Controller</span></div><div><span style="border-collapse:collapse"><br></span></div><div><span style="border-collapse:collapse"><b>CERTIFIED GOOGLE ADWORDS PROFESSIONAL</b><br><br></span></div><div>1300 884 998<br><p></p><p><a href="http://www.searchresults.com.au/" target="_blank">http://www.searchresults.com.au/</a></p><p><img src="http://searchresults.com.au/wp-content/uploads/2014/02/logo5.png"><br><br>Copyright © 2015 SEARCH RESULTS Pty Ltd. All Rights Reserved.&nbsp;<br></p><p></p><div>&nbsp;<br><br></div><font face="times new roman, serif" size="1">The
     information contained in this e-mail is private and confidential and 
    only intended to the recipient of this email.&nbsp; Search Results have, in 
    preparing this information used our best endeavours to ensure that the 
    information contained therein is true and accurate, but accept no 
    responsibility and disclaim all liability in respect of any errors, 
    inaccuracies or misstatements contained herein. All parties interested 
    in any Search Results product and /or service should make their own 
    inquiries to verify the information contained herein. If you are not the
     intended recipient, you may not disclose or use the information in this
     e-mail in any way.&nbsp; Search Results does not guarantee the integrity of 
    any e-mails or attached files. The views or opinions expressed are the 
    author's own and may not reflect the views or opinions of Search Results
     Specialists Pty Ltd.&nbsp;Search Results Specialists Pty Ltd&nbsp;is an 
    independent service company that has no association or affiliation with 
    Google. Google, AdWords and Google Places are registered or unregistered
     trademarks, and are the property of, Google&nbsp;Inc. or related entity.</font></div></div></div></div><p></p><div><br></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>
    </div>
    </div></div></blockquote></div><br><br clear="all"><br>-- <br><div><div dir="ltr"><div><div dir="ltr"><div>-<br>Regards<br></div>Vishal<br></div><div dir="ltr"><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.systango.com/" target="_blank"><img src="http://www.systematixtechnocrates.com/logo-signature.png" border="0"></a></div><div dir="ltr" style="font-size:12.8000001907349px"><a href="http://www.codepunt.today/" target="_blank"><img src="http://systango.com/img/promotions/CodePunt%20Banner%20B.jpg" height="52" width="420"></a></div></div></div></div></div>
    </div>
    </blockquote></div>
    </div></div></blockquote></div><br></div></div></div>
    </blockquote></div><br></div></td>`;
        const expectedOutput = 'Can you advise whether this has been done?';
        let actualOutput = emailParseUtil.removeQuotedTextFromEmail(originalEmail);
        expect.equal(actualOutput, expectedOutput);
        expect.end();
    });

    test('Cherie example', function (expect) {
        const originalEmail = `Hi Cherie,
 
Access to our website is below.
 



 
 
Thank you.
 
Regards,
 
cid:image005.png@01CF6D4C.C0ADC730
Be GREEN! Please read from the screen.
This message is intended for the use of the party to whom it is addressed and may contain information that is confidential.  If you have received this mail in error you must not distribute, copy or take any action with respect to it, and notify Remedial Technologies Australia immediately.  Except for legitimate company matters, Remedial Technologies Australia Pty Ltd does not accept any responsibility for the opinions expressed in this email.  Attachments to this email may not have been checked for software viruses.
 
From: techprojectsau@zohosupport.com [mailto:techprojectsau@zohosupport.com] On Behalf Of Search Results Support
Sent: Monday, 11 January 2016 5:24 PM
To: RemTech Accounts <accounts@remtech.com.au>
Subject: Re: [##54329##] FTP Access
 
Hi Nour, 
 
Your website is the center of your online presence, it’s where google goes to cross-reference information that is broadcasted across the internet. One of the most crucial steps is making sure that your website is congruent with what all the work we are doing to get your Google Places listing on the front page. To do this we will need access to the following components of your website which you can get from your web developers or current website host.
 
FTP Access - This is the control panel for your hosting account for your website which will have a unique username and password. This will also be available from your website host.
 
Domain: 
 
Username: 
 
Password: 
 
Having access to the above components of your website are requirements for your campaigns ability to perform at its best. We will not be changing the way your website looks, just the back end meta tags that are used by search engines to determine what your business does.  We require this access within the next 7 days, the longer it takes for you to provide us with this information the longer it will take to get your business ranking on the front page. Please contact your website host to get this information. If you need further assistance please contact the support team at support@searchresults.com.au or give us a call at 1300 884 998.



We want to hear from you. How did you rate our customer service?
Good
Okay
Bad
 
 

Kind Regards,
 
Cherie
Customer Support Team
 
1300 884 998
http://www.searchresults.com.au/




 

 

Copyright © 2015 Search Results Specialists Pty Ltd. All Rights Reserved. 

 

The information contained in this e-mail is private and confidential and only intended to the recipient of this email.  Search Results have, in preparing this information used our best endeavours to ensure that the information contained therein is true and accurate, but accept no responsibility and disclaim all liability in respect of any errors, inaccuracies or misstatements contained herein. All parties interested in any Search Results product and /or service should make their own inquiries to verify the information contained herein. If you are not the intended recipient, you may not disclose or use the information in this e-mail in any way.  Search Results does not guarantee the integrity of any e-mails or attached files. The views or opinions expressed are the author's own and may not reflect the views or opinions of Search Results Specialists Pty Ltd. Search Results Specialists Pty Ltd is an independent service company that has no association or affiliation with Google. Google, AdWords and Google Places are registered or unregistered trademarks, and are the property of, Google Inc. or related entity.`;
        const expectedOutput = 'Hi Cherie,\n \nAccess to our website is below.\n \n\n\n\n \n \nThank you.';
        let actualOutput = emailParseUtil.removeQuotedTextFromEmail(originalEmail);
        expect.equal(actualOutput, expectedOutput);
        expect.end();
    });

    test('Simone example', function (expect) {
        const originalEmail = `Hi Simone,
hope you're having a nice weekend:) Thanks for that info + questions. I've written answers below.

*We have a database of customers which buy specific brands across what we represent, some buy all brands, some buy less.
How many customers do you have in total?
*Can we sort by brand using your system?
Yes
*Can we record relationship details?  eg sales calls, appointments, emails etc...
Yes
*Can we use our ordering system Nuorder in conjunction with Zoho?
I'm not sure. Have contacted NuOrder for details about the API
*Does it talk to Mailchimp, so we can send out newsletters to specific buyers by brand?
Yes. You can also use Zoho Campaigns which does the same thing and has better integration.

best regards,

Jeremy Nagel
Lead Developer
Nuanced IT

E: jeremy.nagel@nuanced.it
M: (+61) 0414 885 787
Skype: jeznag`;
        const expectedOutput = `Hi Simone,
hope you're having a nice weekend:) Thanks for that info + questions. I've written answers below.

*We have a database of customers which buy specific brands across what we represent, some buy all brands, some buy less.
How many customers do you have in total?
*Can we sort by brand using your system?
Yes
*Can we record relationship details?  eg sales calls, appointments, emails etc...
Yes
*Can we use our ordering system Nuorder in conjunction with Zoho?
I'm not sure. Have contacted NuOrder for details about the API
*Does it talk to Mailchimp, so we can send out newsletters to specific buyers by brand?
Yes. You can also use Zoho Campaigns which does the same thing and has better integration.`;
        let actualOutput = emailParseUtil.removeQuotedTextFromEmail(originalEmail);
        expect.equal(actualOutput, expectedOutput);
        expect.end();
    });

    test('Muhammad example', function (expect) {
        const originalEmail = `Dear *Jeremy*,



Thanks for assistance.



The meeting was good day on the demo. Client seems OK with all points
except booking chart.

During Zoho Reports demo they found a chart view (as attached with
amendments here), which they like to use for their booking chart.

I would request you, if you could share the possibility of achieving it and
could be integrated with Zoho CRM, Creator, Reports.

I am just looking for your understating if it possible with investment
outline. I have mentioned some of the required points below –



·         The booking chart should auto update instantly, when the location
booking is approved in CRM.

·         Prior to booking when under approval, it should reflect in the
CRM too as mentioned in the image.

·         It should be interactive enough with ease of understating for all
viewers.

·         When a portion of status is hovered over, it should give basic
details about that (Client, Start Date, End Date, Agency/ Direct etc.)

·         The chart would be based on locations not on the calendar or
date, the mean here is, all locations will remain listed intact and can be
further filtered with other sub related details. (Status, Agencies,
Locations, Start/End Date, Status etc.).

·         Each location has a unique code, while hovering over to, it
should give details of it.

·         The page view should give monthly view as default which could be
customised based on weeks.

·         The chart should reflect the locations which are upcoming
available with differentiation. like before 7 days or so.. The CRM should
also send email to CRM user for this so they concentrate for new potentials.

·         A limited view access is to be given to some agencies based on
their relation with specific locations only.



More, they do also have a question about Account Management, would we be
able to handle a situation while two CRM users approach one client for
different services without having to look each other’s job on that.

Meanwhile, the admin or someone as manager can see overall on that
particular account. I was thinking it to be with Parent / Child relation.

Am I right on this, or what is your view?



Looking for your feedback.



*--*

*Regards,*

*Muhammad Usman Khan*

*Product Consultant *

*Elitbuzz Technologies DMCC*

*[image:
https://docs.google.com/a/elitbuzz.com/uc?id=0Bz2sPIyQIAT-SFpqOEwwMWhudEk&export=download]*

*Mobile - +971-50-689-2526 | Office - +971-4-453-6025*

*Web - **www.elitbuzz.com* <http://www.elitbuzz.com/>
* | Fortune Tower, JLT, Dubai (UAE)**Your ITSM Partner for* *– **Zoho CRM
|Business Intelligence |Project |Survey |SMS/Email Marketing*



*From:* Jeremy Nagel [mailto:jeremy.nagel@nuanced.it]
*Sent:* Sunday, January 31, 2016 12:22 AM
*To:* Usman Khan <usman@elitbuzz.com>
*Cc:* Hernan Domingo <hernan@empirerocket.com>; Vinay Dadlani <
vinay@elitbuzz.com>
*Subject:* Re: Zoho Development Alliance



Rough estimates are:
$600 USD for the CRM changes

$3000 USD for the booking system including booking chart


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Sun, Jan 31, 2016 at 12:02 AM, Usman Khan <usman@elitbuzz.com> wrote:

Dear Jeremey,



Thank you very much.

I just wanted to see the possibility of achieving it, so I can educate same
to client.



Could you meanwhile help me with an investment outline of your work on all
these points including the required booking chart UI for actual project?



So, we could talk on commercial with client and setup the right
expectations.



Thanks for being helpful.

--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Sat, Jan 30, 2016 at 4:56 AM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

BookedIn.com will probably not be appropriate because it can't do multi
level approval amongst other things. We included some screenshots from
there to show how it might look but to achieve the desired UI, we'll
probably need to build a custom booking system from scratch in
PHP/NodeJS/Zoho Creator.


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Sat, Jan 30, 2016 at 11:52 PM, Usman Khan <usman@elitbuzz.com> wrote:

The Dear Jeremy & Hernan,



Thanks a lot for all these preparation.

The shares PPT really makes a lot of useful information for this project.



My meeting is at 10 AM tomorrow. (Dubai Timings)



I just have a quick question about Booking Chart, is it possible for us to
get a chart view in Bookedin.com <http://bookedin.com> based on the
Locations and remain intact with all basic information & filters (agencies,
end client, duration, status etc.

Like the attached picture or something

[image: IMG_50182856D6DF-A82A-4A32-9F32-DC3DFF30B50E]

--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Sat, Jan 30, 2016 at 4:02 AM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

Hi Usman,
Hernan and I have made a few more changes. Ready for you to take a look at
and tweak further:
https://docs.google.com/presentation/d/1qpld1-wFFTynr9q2C4RMKjdY22XOxycRbtjmSlWL8JA/edit#slide=id.p43



What time is your meeting tomorrow? We'll see if we can make it. Otherwise,
best of luck :)



cheers


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Sat, Jan 30, 2016 at 5:13 PM, Usman Khan <usman@elitbuzz.com> wrote:

Thanks a lot Jeremy,



If we could have bit by today evening.

As, I have demo presentation tomorrow.

--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Fri, Jan 29, 2016 at 3:09 PM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

Hi Usman, here's a progress update showing what we've done so far:
https://docs.google.com/presentation/d/1gr4HGFWeD8j8nP6i2e97DG2HwTeomSepR-AZFmQAQ4c/edit#slide=id.p3

We still need to prepare wireframes for the booking system and make a few
other changes but thought I'd show you where we've got to. Work on the demo
will continue today.


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Fri, Jan 29, 2016 at 3:48 AM, Usman Khan <usman@elitbuzz.com> wrote:

Dear *Jeremy*,



If you require any assistance or further clarification on that, please get
back to me.

Looking forward to start a long relationship with you.



*--*

*Regards,*

*Muhammad Usman Khan*

*Product Consultant *

*Elitbuzz Technologies DMCC*

*[image:
https://docs.google.com/a/elitbuzz.com/uc?id=0Bz2sPIyQIAT-SFpqOEwwMWhudEk&export=download]*

*Mobile - +971-50-689-2526 <%2B971-50-689-2526> | Office - +971-4-453-6025
<%2B971-4-453-6025>*

*Web - **www.elitbuzz.com* <http://www.elitbuzz.com/>
* | Fortune Tower, JLT, Dubai (UAE)**Your ITSM Partner for* *– **Zoho CRM
|Business Intelligence |Project |Survey |SMS/Email Marketing*



*From:* Usman Khan [mailto:usman@elitbuzz.com]
*Sent:* Thursday, January 28, 2016 3:24 PM
*To:* Jeremy Nagel <jeremy.nagel@nuanced.it>


*Subject:* Re: Zoho Development Alliance



Thanks Jeremy,



I would really appreciate.

--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Thu, Jan 28, 2016 at 3:12 AM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

I'll work on a slide deck and send it across to you.

cheers


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Thu, Jan 28, 2016 at 9:05 PM, Usman Khan <usman@elitbuzz.com> wrote:

Great Jeremy,



I would surely appreciate that.

How would we proceed further?



We would the actual project to you once awarded.

Should you require any further assistance you may feel free to contact me
on *+971-52-524-2514 <%2B971-52-524-2514>*.



*--*

*Regards,*

*Muhammad Usman Khan*

*Product Consultant *

*Elitbuzz Technologies DMCC*

*[image:
https://docs.google.com/a/elitbuzz.com/uc?id=0Bz2sPIyQIAT-SFpqOEwwMWhudEk&export=download]*

*Mobile - +971-50-689-2526 <%2B971-50-689-2526> | Office - +971-4-453-6025
<%2B971-4-453-6025>*

*Web - **www.elitbuzz.com* <http://www.elitbuzz.com/>
* | Fortune Tower, JLT, Dubai (UAE)**Your ITSM Partner for* *– **Zoho CRM
|Business Intelligence |Project |Survey |SMS/Email Marketing*



*From:* Jeremy Nagel [mailto:jeremy.nagel@nuanced.it]
*Sent:* Thursday, January 28, 2016 1:51 PM


*To:* Usman Khan <usman@elitbuzz.com>
*Subject:* RE: Zoho Development Alliance



I can't build everything in that time but will work on a proposal showing
how it would be done with screenshots and wire frames. My team and I will
have it ready by Saturday afternoon Australian time.

Sent from my portable messenger pigeon launcher. Please forgive brevity and
spelling mistakes. The pigeon has a habit of pecking off important letters.

On 28 Jan 2016 6:39 pm, "Usman Khan" <usman@elitbuzz.com> wrote:

Dear Jeremy,



Thanks for your update and suggestion.

They are looking some demo on

·         Location Booking Validation & Approval Flow (If a location is
already booked, it should be able to be booked again for that duration to
avoid human error. And each booking should go under multilevel approval.)

·         Installation Checklist Flow (Auto task assigned to Installation
team for particular Booking to take place)

·         Account Contact Management (when an End Client is dealt with
multiple channels for multiple interactions as direct or agencies)

·         Booking Chart (Ideal Hypothetical Images Can also work for demo)

·         Quote & Invoice Generation on these location booking



As I have been looking for someone to assist on this but not finding the
right person.

The client is confirming the demo on Sunday morning.



Could you help on it?

Should you require any further assistance you may feel free to contact me
on *+971-52-524-2514 <%2B971-52-524-2514>*.



*--*

*Regards,*

*Muhammad Usman Khan*

*Product Consultant *

*Elitbuzz Technologies DMCC*

*[image:
https://docs.google.com/a/elitbuzz.com/uc?id=0Bz2sPIyQIAT-SFpqOEwwMWhudEk&export=download]*

*Mobile - +971-50-689-2526 <%2B971-50-689-2526> | Office - +971-4-453-6025
<%2B971-4-453-6025>*

*Web - **www.elitbuzz.com* <http://www.elitbuzz.com/>
* | Fortune Tower, JLT, Dubai (UAE)**Your ITSM Partner for* *– **Zoho CRM
|Business Intelligence |Project |Survey |SMS/Email Marketing*



*From:* Jeremy Nagel [mailto:jeremy.nagel@nuanced.it]
*Sent:* Thursday, January 28, 2016 11:28 AM
*To:* Usman Khan <usman@elitbuzz.com>
*Subject:* RE: Zoho Development Alliance



Ok. What kind of a demo are they looking for? The location chart would
require significant development.

It might be worth looking at using a third party platform like bookedin.com
rather than building the booking system from scratch. Bookedin could be
integrated with zoho crm relatively easily and inexpensively. ($700)

It can fulfill all the requirements out of the box.

Sent from my portable messenger pigeon launcher. Please forgive brevity and
spelling mistakes. The pigeon has a habit of pecking off important letters.

On 27 Jan 2016 6:22 pm, "Usman Khan" <usman@elitbuzz.com> wrote:

Dear Jeremy,



Thanks for your reply.

I have mentioned my understating on your comments –

https://docs.google.com/presentation/d/15SbhsIhrOSAfIJFrZth2jTOqXyR-R1PlLZZjMDpRdSw/edit?usp=sharing



More we are looking for someone to keep helping us in our regular projects.

Now we have got to hot potentials, they need a demo on some of their
crucial points as I have shared one with you.



If you could help in this.

Should you require any further assistance you may feel free to contact me
on *+971-52-524-2514 <%2B971-52-524-2514>*.



*--*

*Regards,*

*Muhammad Usman Khan*

*Product Consultant *

*Elitbuzz Technologies DMCC*

*[image:
https://docs.google.com/a/elitbuzz.com/uc?id=0Bz2sPIyQIAT-SFpqOEwwMWhudEk&export=download]*

*Mobile - +971-50-689-2526 <%2B971-50-689-2526> | Office - +971-4-453-6025
<%2B971-4-453-6025>*

*Web - **www.elitbuzz.com* <http://www.elitbuzz.com/>
* | Fortune Tower, JLT, Dubai (UAE)**Your ITSM Partner for* *– **Zoho CRM
|Business Intelligence |Project |Survey |SMS/Email Marketing*



*From:* Jeremy Nagel [mailto:jeremy.nagel@nuanced.it]
*Sent:* Wednesday, January 27, 2016 1:46 AM
*To:* Usman Khan <usman@elitbuzz.com>
*Subject:* Re: Zoho Development Alliance



Hi Usman,

apologies for the delay. Have left some comments here:
https://docs.google.com/presentation/d/15SbhsIhrOSAfIJFrZth2jTOqXyR-R1PlLZZjMDpRdSw/edit#slide=id.p7



Do you need an estimate right away? I can give a worst case scenario
estimate based on what I know so far.

I'd say $700 for the Zoho CRM aspects (slides 1-3) and $3000 for the
booking system (slides 4-9). It would take 1 week for the CRM changes and
3-5 weeks for the booking system.

This is a worst case scenario estimate and would probably be less once I
have complete details.


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Tue, Jan 26, 2016 at 4:12 PM, Usman Khan <usman@elitbuzz.com> wrote:

Dear Jeremy,



Any update on this?

--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Sun, Jan 24, 2016 at 12:42 PM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

Thanks. I'll review it thoroughly over the next day and come back with some
questions before providing an estimate.

Sent from my portable messenger pigeon launcher. Please forgive brevity and
spelling mistakes. The pigeon has a habit of pecking off important letters.

On 24 Jan 2016 3:56 pm, "Usman Khan" <usman@elitbuzz.com> wrote:

Dear Jeremy,



Thanks for your helping hand.

I have attached a PPT on scope of work for this specific project.



I would request to help with the timeline and costing on it.  We do also
need to give a high level demo on the prospective solution, if you can also
help for that too.

--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Sat, Jan 23, 2016 at 3:20 PM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

Can you provide a detailed specification showing what is required for the
outdoor media client so I can provide some estimates?


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Sun, Jan 24, 2016 at 10:17 AM, Jeremy Nagel <jeremy.nagel@nuanced.it>
wrote:

Ok let's give it a go. Happy to support you. I don't have a lot of time
myself but have a few developers who can help.


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Fri, Jan 22, 2016 at 9:28 PM, Usman Khan <usman@elitbuzz.com> wrote:

Yes Jeremy,



We are hoping a lot for Zoho in the region and have already provided basic
level of suscessfull deployment.

Now, we're looking to ahead more agressivly in generating more leads on it
while gathering requirements and handling strong client relationship.



--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Fri, Jan 22, 2016 at 1:08 AM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

Would you gather requirements and handle client relations?


Jeremy Nagel

*Lead Developer*

Nuanced IT <http://Nuanced.IT>



E: jeremy.nagel@nuanced.it

M: (+61) 0414 885 787

Skype: jeznag



On Fri, Jan 22, 2016 at 6:32 PM, Usman Khan <usman@elitbuzz.com> wrote:

Dear Jeremy,



I am looking for entire project developement. To start with a outdoor media
client where need to provide them CRM, Outdoor Locations Bookings /
Installtion Management, Dynamic Booking Chart View, Reports and others.
These seem to be achievable with a collaboration of Zoho CRM, Creator &
Reports.



More if you wish, I can help you with complete work scope.

--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing





On Thu, Jan 21, 2016 at 11:33 AM -0800, "Jeremy Nagel" <
jeremy.nagel@nuanced.it> wrote:

Hi Muhammad, what kind of support do you need? Are there particular tasks
you need help with?

Sent from my portable messenger pigeon launcher. Please forgive brevity and
spelling mistakes. The pigeon has a habit of pecking off important letters.

On 22 Jan 2016 5:21 am, "Usman Khan" <usman@elitbuzz.com> wrote:

Hello Jeremy,

I hope you are doing well.



We (Elitbuzz) as a company is looking for someone who can keep helping us
to develop and deliver custom CRM/ Related Solution.



We are a Zoho consultant in UAE where we have been aggressively delivering
and promoting Zoho suite. However, we are planning to setup an alliance
with a Zoho expert to keep consulting us on end clients' requirements
evaluation and possibility mapping with Zoho Suites.



Currently, we have almost two upcoming projects and wants someone to start
this kind of alliance with on urgent basis.



Our partnership has a long term vision.



I personally know you and your expertise. If you are available on this do
let me know for a call.



--
Regards,
Muhammad Usman Khan
Pre-Sales Consultant
Elitbuzz Technologies DMCC
Mobile - +971-50-689-2526
Web - www.elitbuzz.com | JLT, Dubai (UAE)
Your ITSM Partner for – Zoho CRM |Business Intelligence |Project |Survey
|SMS/Email Marketing`;
        const expectedOutput = 'Dear *Jeremy*,\n\n\n\nThanks for assistance.\n\n\n\nThe meeting was good day on the demo. Client seems OK with all points\nexcept booking chart.\n\nDuring Zoho Reports demo they found a chart view (as attached with\namendments here), which they like to use for their booking chart.\n\nI would request you, if you could share the possibility of achieving it and\ncould be integrated with Zoho CRM, Creator, Reports.\n\nI am just looking for your understating if it possible with investment\noutline. I have mentioned some of the required points below –\n\n\n\n·         The booking chart should auto update instantly, when the location\nbooking is approved in CRM.\n\n·         Prior to booking when under approval, it should reflect in the\nCRM too as mentioned in the image.\n\n·         It should be interactive enough with ease of understating for all\nviewers.\n\n·         When a portion of status is hovered over, it should give basic\ndetails about that (Client, Start Date, End Date, Agency/ Direct etc.)\n\n·         The chart would be based on locations not on the calendar or\ndate, the mean here is, all locations will remain listed intact and can be\nfurther filtered with other sub related details. (Status, Agencies,\nLocations, Start/End Date, Status etc.).\n\n·         Each location has a unique code, while hovering over to, it\nshould give details of it.\n\n·         The page view should give monthly view as default which could be\ncustomised based on weeks.\n\n·         The chart should reflect the locations which are upcoming\navailable with differentiation. like before 7 days or so.. The CRM should\nalso send email to CRM user for this so they concentrate for new potentials.\n\n·         A limited view access is to be given to some agencies based on\ntheir relation with specific locations only.\n\n\n\nMore, they do also have a question about Account Management, would we be\nable to handle a situation while two CRM users approach one client for\ndifferent services without having to look each other’s job on that.\n\nMeanwhile, the admin or someone as manager can see overall on that\nparticular account. I was thinking it to be with Parent / Child relation.\n\nAm I right on this, or what is your view?\n\n\n\nLooking for your feedback.\n\n\n\n*--*\n\n*';
        let actualOutput = emailParseUtil.removeQuotedTextFromEmail(originalEmail);
        expect.equal(actualOutput, expectedOutput);
        expect.end();
    });
})();
